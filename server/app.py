from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Load your machine learning model
model = joblib.load(r'tender_win_prediction_model.pkl')
preprocessor = joblib.load(r"preprocessing.pkl")

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    # Preprocess the data
    features = preprocessor.transform(pd.DataFrame([data]))
    # Make prediction
    prediction = model.predict(features)
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)