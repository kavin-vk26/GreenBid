import pandas as pd
import random

# Set random seed for reproducibility
random.seed(42)

# Parameters
num_samples = 100  # Number of samples in the dataset

# Sample data generation
data = {
    "Tender ID": [f"Tender_{i+1}" for i in range(num_samples)],
    "Project Type": [random.choice(["Construction", "Infrastructure"]) for _ in range(num_samples)],
    "Estimated Budget": [random.randint(100000, 1000000) for _ in range(num_samples)],
    "Deadline (Days)": [random.randint(10, 180) for _ in range(num_samples)],
    "Material Cost": [random.randint(20000, 500000) for _ in range(num_samples)],
    "Labor Cost": [random.randint(10000, 200000) for _ in range(num_samples)],
    "Equipment Cost": [random.randint(5000, 100000) for _ in range(num_samples)],
    "Total Cost": [],
    "Bid Amount": [],
    "Win Status": [],
    "Risk Score": [random.randint(1, 10) for _ in range(num_samples)],
    "Competitor Bids": [random.randint(100000, 1000000) for _ in range(num_samples)],
}

# Calculate Total Cost and Bid Amount
for i in range(num_samples):
    total_cost = data["Material Cost"][i] + data["Labor Cost"][i] + data["Equipment Cost"][i]
    data["Total Cost"].append(total_cost)
    # Simulate bid amount as a percentage of total cost
    bid_amount = int(total_cost * random.uniform(1.05, 1.25))  # 5% to 25% above total cost
    data["Bid Amount"].append(bid_amount)
    # Simulate win status based on bid amount and competitor bids
    data["Win Status"].append(1 if bid_amount < data["Competitor Bids"][i] else 0)

# Create DataFrame
df = pd.DataFrame(data)

# Save to CSV
df.to_csv("sample_tender_data.csv", index=False)

print("Sample dataset generated: sample_tender_data.csv")