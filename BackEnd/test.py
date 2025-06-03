import joblib
import pandas as pd

# Load the trained model
model = joblib.load("tender_win_prediction_model.pkl")

# Load the preprocessor

preprocessor = joblib.load("preprocessing.pkl")

# Function to predict the win status of a new bid
def predict_bid_win_status(bid_details):
    # Convert bid details to DataFrame
    bid_df = pd.DataFrame([bid_details])
    
    # Preprocess the bid details
    bid_processed = preprocessor.transform(bid_df)
    
    # Predict the win status
    win_status = model.predict(bid_processed)
    
    return "Lose" if win_status[0] == 1 else "Win"

# Example bid details
new_bid ={
    "Budget": 1_000_000,
    "Deadline (Days)": 90,
    "Key Requirements": "Energy-efficient design",
    "Penalties": "$150,000 per day",
    "Region": "Urban",
    "Environmental Impact Score": 5,
    "Energy Use Reduction Goal (%)": 20,
    "Waste Reduction Goal (%)": 25,
    "Renewable Materials Used (%)": 30,
    "Material Cost": 500000,
    "Labor Cost": 400000,
    "Equipment Cost": 200000,
    "Overheads": 150000,
    "Sustainability Investments": 50000,
    "Predicted Environmental Impact": 7,
    "Sustainability Score": 5
}

bid_2 = {
    "Budget": 10_00_000,
    "Deadline (Days)": 90,
    "Key Requirements": "Waste reduction",
    "Penalties": "$50000 per day",
    "Region": "Coastal",
    "Environmental Impact Score": 5,
    "Energy Use Reduction Goal (%)": 25,
    "Waste Reduction Goal (%)": 50,
    "Renewable Materials Used (%)": 40,
    "Material Cost": 300000,
    "Labor Cost": 200000,
    "Equipment Cost": 100000,
    "Overheads": 80000,
    "Sustainability Investments": 30000,
    "Predicted Environmental Impact": 6,
    "Sustainability Score": 7
}


# Predict the win status of the new bid
result = predict_bid_win_status(new_bid)
print(f"The predicted win status of the bid is: {result}")

result = predict_bid_win_status(bid_2)
print(f"The predicted win status of the bid is: {result}")
