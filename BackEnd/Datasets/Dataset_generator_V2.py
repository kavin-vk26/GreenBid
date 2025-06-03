import pandas as pd
import random

# Random seed for reproducibility
random.seed(42)

# Parameters
num_samples = 10000  # Number of tenders

# Document Parsing Dataset
parsed_data = {
    "Tender ID": [f"Tender_{i+1}" for i in range(num_samples)],
    "Project Name": [f"Project_{i+1}" for i in range(num_samples)],
    "Budget": [random.randint(500_000, 50_000_000) for _ in range(num_samples)],
    "Deadline (Days)": [random.randint(30, 720) for _ in range(num_samples)],
    "Key Requirements": [random.choice(["Low-carbon materials", "Energy-efficient design", "Waste reduction"]) for _ in range(num_samples)],
    "Penalties": [f"${random.randint(10_000, 500_000)} per day" for _ in range(num_samples)],
    "Region": [random.choice(["Urban", "Rural", "Coastal"]) for _ in range(num_samples)],
    "Environmental Impact Score": [random.randint(1, 10) for _ in range(num_samples)],
    "Energy Use Reduction Goal (%)": [random.randint(10, 50) for _ in range(num_samples)],
    "Waste Reduction Goal (%)": [random.randint(10, 60) for _ in range(num_samples)],
    "Renewable Materials Used (%)": [random.randint(20, 80) for _ in range(num_samples)],
}

# Cost Prediction Dataset
cost_data = {
    "Tender ID": [f"Tender_{i+1}" for i in range(num_samples)],
    "Material Cost": [random.randint(200_000, 10_000_000) for _ in range(num_samples)],
    "Labor Cost": [random.randint(100_000, 5_000_000) for _ in range(num_samples)],
    "Equipment Cost": [random.randint(50_000, 3_000_000) for _ in range(num_samples)],
    "Overheads": [random.randint(50_000, 1_000_000) for _ in range(num_samples)],
    "Sustainability Investments": [random.randint(50_000, 500_000) for _ in range(num_samples)],
    "Total Project Cost": [],
    "Sustainability Score": [],
    "Predicted Environmental Impact": [],
}

# Calculate Total Project Cost, Sustainability Score, and Predicted Environmental Impact
for i in range(num_samples):
    total_cost = (
        cost_data["Material Cost"][i]
        + cost_data["Labor Cost"][i]
        + cost_data["Equipment Cost"][i]
        + cost_data["Overheads"][i]
        + cost_data["Sustainability Investments"][i]
    )
    cost_data["Total Project Cost"].append(total_cost)
    
    # Calculate sustainability score based on investments and goals
    sustainability_score = (
        parsed_data["Energy Use Reduction Goal (%)"][i] 
        + parsed_data["Waste Reduction Goal (%)"][i] 
        + parsed_data["Renewable Materials Used (%)"][i]
    ) / 3
    cost_data["Sustainability Score"].append(round(sustainability_score, 2))
    
    # Predict environmental impact (mock logic for now)
    predicted_impact = 10 - (sustainability_score / 10)
    cost_data["Predicted Environmental Impact"].append(round(predicted_impact, 2))

# Convert to DataFrame
parsed_df = pd.DataFrame(parsed_data)
cost_df = pd.DataFrame(cost_data)

# Save to CSV
parsed_df.to_csv("parsed_tender_data.csv", index=False)
cost_df.to_csv("cost_prediction_data.csv", index=False)

print("Mock datasets generated: parsed_tender_data.csv, cost_prediction_data.csv")
