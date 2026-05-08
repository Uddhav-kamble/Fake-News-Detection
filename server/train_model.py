"""
Train all 4 ML models from the Fake News Detection notebook
and save them along with the TF-IDF vectorizer for the Flask backend.
"""

import os
import re
import string
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# ─── Paths ────────────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "..")  # c:\ML
MODEL_DIR = os.path.join(BASE_DIR, "models")
os.makedirs(MODEL_DIR, exist_ok=True)


# ─── Text pre-processing (mirrors the notebook's wordopt function) ────────────
def wordopt(text):
    text = text.lower()
    text = re.sub(r'\[.*?\]', '', text)
    text = re.sub(r"\\W", " ", text)
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    text = re.sub(r'<.*?>+', '', text)
    text = re.sub('[%s]' % re.escape(string.punctuation), '', text)
    text = re.sub(r'\w*\d\w*', '', text)
    return text


def main():
    print("=" * 60)
    print("  TruthGuard AI — Model Training Pipeline")
    print("=" * 60)

    # ── 1. Load data ──────────────────────────────────────────────────────────
    print("\n[1/6] Loading datasets...")
    data_fake = pd.read_csv(os.path.join(DATA_DIR, "Fake.csv"))
    data_true = pd.read_csv(os.path.join(DATA_DIR, "True.csv"))
    print(f"       Fake news samples : {len(data_fake):,}")
    print(f"       True news samples : {len(data_true):,}")

    # ── 2. Label and merge ────────────────────────────────────────────────────
    print("\n[2/6] Labelling and merging...")
    data_fake["class"] = 0
    data_true["class"] = 1

    # Remove last 10 from each for manual testing (same as notebook)
    data_fake_manual = data_fake.tail(10)
    for i in range(len(data_fake) - 1, len(data_fake) - 11, -1):
        data_fake.drop([i], axis=0, inplace=True)

    data_true_manual = data_true.tail(10)
    for i in range(len(data_true) - 1, len(data_true) - 11, -1):
        data_true.drop([i], axis=0, inplace=True)

    data_merge = pd.concat([data_fake, data_true], axis=0)
    data = data_merge.drop(["title", "subject", "date"], axis=1)
    data = data.sample(frac=1, random_state=42)
    data.reset_index(inplace=True)
    data.drop(["index"], axis=1, inplace=True)
    print(f"       Total training samples: {len(data):,}")

    # ── 3. Pre-process text ───────────────────────────────────────────────────
    print("\n[3/6] Pre-processing text...")
    data["text"] = data["text"].apply(wordopt)

    x = data["text"]
    y = data["class"]

    # ── 4. Vectorize ──────────────────────────────────────────────────────────
    print("\n[4/6] Vectorizing with TF-IDF...")
    x_train, x_test, y_train, y_test = train_test_split(
        x, y, test_size=0.25, random_state=42
    )

    vectorizer = TfidfVectorizer()
    xv_train = vectorizer.fit_transform(x_train)
    xv_test = vectorizer.transform(x_test)
    print(f"       Vocabulary size: {len(vectorizer.vocabulary_):,}")
    print(f"       Train samples : {xv_train.shape[0]:,}")
    print(f"       Test samples  : {xv_test.shape[0]:,}")

    # ── 5. Train models ──────────────────────────────────────────────────────
    print("\n[5/6] Training models...\n")

    models = {
        "logistic_regression": LogisticRegression(),
        "decision_tree": DecisionTreeClassifier(),
        "gradient_boosting": GradientBoostingClassifier(random_state=0),
        "random_forest": RandomForestClassifier(random_state=0),
    }

    for name, model in models.items():
        print(f"  Training {name}...", end=" ", flush=True)
        model.fit(xv_train, y_train)
        train_acc = model.score(xv_train, y_train)
        test_acc = model.score(xv_test, y_test)
        print(f"[OK]  train={train_acc:.4f}  test={test_acc:.4f}")

    # ── 6. Save artifacts ─────────────────────────────────────────────────────
    print("\n[6/6] Saving models and vectorizer...")
    joblib.dump(vectorizer, os.path.join(MODEL_DIR, "tfidf_vectorizer.joblib"))
    print(f"  [OK] Saved tfidf_vectorizer.joblib")

    for name, model in models.items():
        path = os.path.join(MODEL_DIR, f"{name}.joblib")
        joblib.dump(model, path)
        print(f"  [OK] Saved {name}.joblib")

    # ── Summary ───────────────────────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("  All models trained and saved to ./models/")
    print("  You can now start the Flask server with: python app.py")
    print("=" * 60)

    # Print detailed classification reports
    print("\n-- Detailed Classification Reports -----------------------------\n")
    for name, model in models.items():
        preds = model.predict(xv_test)
        print(f"  {name.upper().replace('_', ' ')}:")
        print(f"  Accuracy: {accuracy_score(y_test, preds):.4f}")
        print(classification_report(y_test, preds, target_names=["Fake", "Real"]))


if __name__ == "__main__":
    main()
