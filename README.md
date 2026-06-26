# 🛡️ TruthGuard AI — Fake News Detection Suite

TruthGuard AI is a state-of-the-art, end-to-end Machine Learning web application designed to identify and flag deceptive news articles. Leveraging a combination of text pre-processing, TF-IDF vectorization, and a robust ensemble of multiple supervised classification models, TruthGuard AI evaluates input articles and provides cross-model predictions with high precision.

The system features a **Flask API backend** for hosting the models and a **Vite + React + Tailwind CSS client** providing a premium, interactive dark-mode user interface.

---

## ✨ Features

* **Multi-Model Evaluation**: Evaluates news text against four different machine learning classifiers simultaneously:
  1. Logistic Regression
  2. Decision Tree Classifier
  3. Gradient Boosting Classifier
  4. Random Forest Classifier
* **Ensemble Voting Consensus**: Combines predictions from all four models using a majority-voting consensus, adjusting confidence dynamically based on individual classifier probabilities.
* **Model Training Pipeline**: Simple, standalone command-line pipeline to pre-process the raw datasets, partition data, train all classifiers, and serialize the models/vectorizer into `.joblib` format.

---

## 📂 Project Structure

```text
├── client/                      # React Frontend Application
│   ├── src/
│   │   ├── components/          # Reusable UI elements (Navbar, Footer, Hero, HowItWorks, etc.)
│   │   ├── pages/               # Main Page Routes (Home, Detect, About)
│   │   ├── App.jsx              # Main React Application Router and Layout
│   │   ├── index.css            # Custom Styling & Tailwind configuration
│   │   └── main.jsx             # React entry point
│   ├── package.json             # Frontend dependencies & npm scripts
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   └── vite.config.js           # Vite configuration
│
├── server/                      # Python Flask Backend
│   ├── models/                  # [Generated] Serialized TF-IDF vectorizer and trained models
│   ├── app.py                   # Flask server exposing APIs for predictions and health checks
│   ├── train_model.py           # ML Model training pipeline script
│   └── requirements.txt         # Backend Python dependencies
│
├── Fake.csv                     # Raw fake news dataset (CSV format)
├── True.csv                     # Raw real news dataset (CSV format)
├── manual_testing.csv           # Manual validation dataset holdouts
└── Fake News Detection using machine learning.ipynb  # Exploration & analysis Jupyter notebook
```

---

## ⚙️ Setup & Installation

### Prerequisites

Ensure you have the following installed on your machine:
* Python 3.8+
* Node.js 18+ (with `npm` or `yarn`)

---

### Step 1: Backend Setup & Model Training

1. **Navigate to the server directory**:
   ```bash
   cd server
   ```

2. **Create and activate a virtual environment (optional but recommended)**:
   * **Windows**:
     ```bash
     python -m venv venv
     .\venv\Scripts\activate
     ```
   * **macOS/Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install the required dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Train the Models**:
   The training pipeline expects `Fake.csv` and `True.csv` to be in the project root directory. Run the training script to process the datasets and save the trained models:
   ```bash
   python train_model.py
   ```
   This will train all four models, log their training/testing accuracies, print classification reports, and save the serialized weights in the `server/models/` directory.

5. **Start the Flask Server**:
   ```bash
   python app.py
   ```
   The backend server will run by default at `http://127.0.0.1:5000/`.

---

### Step 2: Frontend Setup

1. **Navigate to the client directory**:
   ```bash
   cd ../client
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file (or edit `client/src/.env`) to point the frontend to your local API server:
   ```env
   VITE_API_URL=http://127.0.0.1:5000/
   ```

4. **Start the Vite Dev Server**:
   ```bash
   npm run dev
   ```
   The client application will start at `http://localhost:5173/`. Open this link in your browser to run the interface.

---

## 🧠 Machine Learning Details

### Text Pre-processing
To ensure consistency, raw text inputted in the browser is cleaned exactly as done during training using the custom `wordopt` function:
* Converts text to lowercase.
* Removes square brackets, brackets content, and HTML tags.
* Removes URLs and links (`https?://\S+|www\.\S+`).
* Strips out punctuation and digits.

### Feature Extraction
Cleaned text is vectorized using a **TF-IDF (Term Frequency-Inverse Document Frequency) Vectorizer**, converting unstructured textual articles into numerical feature matrices.

### Models and Classifier Performances
The models are trained using a $75/25$ split of the dataset (comprising $\sim 23,000$ fake and $\sim 21,000$ real news articles):
* **Logistic Regression**: Reliable linear classification baseline.
* **Decision Tree**: Rule-based hierarchical splitting.
* **Gradient Boosting**: Iterative ensemble of weak decision trees.
* **Random Forest**: Parallel bag of decision trees reducing variance.

---

## 🌐 API Reference

### Health Check
* **Endpoint**: `GET /`
* **Response**:
  ```json
  {
    "status": "online",
    "service": "TruthGuard AI Backend",
    "models_loaded": [
      "Logistic Regression",
      "Decision Tree",
      "Gradient Boosting",
      "Random Forest"
    ]
  }
  ```

### Prediction API
* **Endpoint**: `POST /predict`
* **Content-Type**: `application/json`
* **Request Body**:
  ```json
  {
    "text": "The full body of the news article to analyze..."
  }
  ```
* **Response**:
  ```json
  {
    "prediction": "Real News",
    "confidence": "98.5%",
    "confidence_value": 0.985,
    "word_count": 42,
    "char_count": 256,
    "model_results": {
      "Logistic Regression": {
        "prediction": "Real News",
        "confidence": "99.1%",
        "confidence_value": 0.991
      },
      ...
    }
  }
  ```

---

## 🛡️ License & Attributions
* **Datasets**: Grounded on standard Kaggle datasets tracking real and fake news articles.
* **Built For**: Machine learning model testing, deployment demonstrations, and real-time inference showcase.
