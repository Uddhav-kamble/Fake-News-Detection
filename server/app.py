"""
TruthGuard AI — Flask Backend
Serves the trained fake news detection models via a REST API.
"""

import os
import re
import string
import numpy as np
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

# ─── App Setup ────────────────────────────────────────────────────────────────
app = Flask(__name__)
CORS(app)  # Allow requests from the React client

# ─── Load Models ──────────────────────────────────────────────────────────────
MODEL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models")

print("Loading models...")
try:
    vectorizer = joblib.load(os.path.join(MODEL_DIR, "tfidf_vectorizer.joblib"))
    models = {
        "Logistic Regression": joblib.load(os.path.join(MODEL_DIR, "logistic_regression.joblib")),
        "Decision Tree": joblib.load(os.path.join(MODEL_DIR, "decision_tree.joblib")),
        "Gradient Boosting": joblib.load(os.path.join(MODEL_DIR, "gradient_boosting.joblib")),
        "Random Forest": joblib.load(os.path.join(MODEL_DIR, "random_forest.joblib")),
    }
    print("[OK] All models loaded successfully!")
except FileNotFoundError as e:
    print(f"[ERROR] Model files not found: {e}")
    print("  Please run 'python train_model.py' first to train and save the models.")
    exit(1)


# ─── Text pre-processing (mirrors the notebook's wordopt function) ────────────
def wordopt(text):
    """Clean and normalize text exactly as done during training."""
    text = text.lower()
    text = re.sub(r'\[.*?\]', '', text)
    text = re.sub(r"\\W", " ", text)
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    text = re.sub(r'<.*?>+', '', text)
    text = re.sub('[%s]' % re.escape(string.punctuation), '', text)
    text = re.sub(r'\w*\d\w*', '', text)
    return text


def get_prediction_label(n):
    """Convert numeric prediction to human-readable label."""
    return "Real News" if n == 1 else "Fake News"


# ─── Routes ───────────────────────────────────────────────────────────────────

@app.route("/", methods=["GET"])
def health():
    """Health check endpoint."""
    return jsonify({
        "status": "online",
        "service": "TruthGuard AI Backend",
        "models_loaded": list(models.keys()),
    })


@app.route("/predict", methods=["POST"])
def predict():
    """
    Predict whether news text is fake or real.

    Expects JSON: { "text": "some news article text..." }
    Returns JSON:  {
        "prediction": "Real News" | "Fake News",
        "confidence": "98.5%",
        "confidence_value": 0.985,
        "word_count": 42,
        "char_count": 256,
        "model_results": { ... }
    }
    """
    data = request.get_json()

    # ── Validate input ────────────────────────────────────────────────────────
    if not data or "text" not in data:
        return jsonify({"error": "Missing 'text' field in request body."}), 400

    raw_text = data["text"].strip()
    if len(raw_text) < 10:
        return jsonify({"error": "Text is too short. Please provide at least 10 characters."}), 400

    # ── Pre-process ───────────────────────────────────────────────────────────
    cleaned_text = wordopt(raw_text)
    vectorized = vectorizer.transform([cleaned_text])

    # ── Run all 4 models ──────────────────────────────────────────────────────
    model_results = {}
    votes = []

    for name, model in models.items():
        pred = model.predict(vectorized)[0]
        label = get_prediction_label(pred)
        votes.append(pred)

        # Get confidence via predict_proba if available
        confidence = None
        if hasattr(model, "predict_proba"):
            proba = model.predict_proba(vectorized)[0]
            confidence = float(max(proba))

        model_results[name] = {
            "prediction": label,
            "confidence": f"{confidence * 100:.1f}%" if confidence else "N/A",
            "confidence_value": confidence,
        }

    # ── Ensemble: majority vote ───────────────────────────────────────────────
    avg_vote = np.mean(votes)
    final_prediction = 1 if avg_vote >= 0.5 else 0
    final_label = get_prediction_label(final_prediction)

    # Calculate overall confidence from models that support predict_proba
    confidences = [r["confidence_value"] for r in model_results.values() if r["confidence_value"] is not None]
    overall_confidence = float(np.mean(confidences)) if confidences else 0.75

    # If majority says fake but confidence says real (or vice versa), adjust
    if final_prediction == 0:
        overall_confidence = 1.0 - overall_confidence if overall_confidence > 0.5 and avg_vote < 0.5 else overall_confidence

    # Word and character counts
    word_count = len(raw_text.split())
    char_count = len(raw_text)

    return jsonify({
        "prediction": final_label,
        "confidence": f"{overall_confidence * 100:.1f}%",
        "confidence_value": round(overall_confidence, 4),
        "word_count": word_count,
        "char_count": char_count,
        "model_results": model_results,
    })


# ─── Run ──────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("\n" + "=" * 50)
    print("  TruthGuard AI Backend — Running on port 5000")
    print("=" * 50 + "\n")
    app.run(host="0.0.0.0", port=5000, debug=True)
