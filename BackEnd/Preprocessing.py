import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import random
import seaborn as sns

# Load the datasets
parsed_df = pd.read_csv("parsed_tender_data.csv")
cost_df = pd.read_csv("cost_prediction_data.csv")

# Merge the datasets on Tender ID
data = pd.merge(parsed_df, cost_df, on="Tender ID")

# Check for missing values
print("Missing values before dropping rows:")
print(data.isnull().sum())

# Drop rows with missing values (if any)
data.dropna(inplace=True)

# Generate a mock 'Win Status' column for classification (0 = Lose, 1 = Win)
random.seed(42)
data["Win Status"] = [random.choice([0, 1]) for _ in range(len(data))]

# Define features and target variable
X = data.drop(columns=["Win Status", "Tender ID", "Project Name", "Total Project Cost"])
y = data["Win Status"]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define preprocessing for numerical and categorical features
numeric_features = X_train.select_dtypes(include=['int64', 'float64']).columns.tolist()
categorical_features = X_train.select_dtypes(include=['object']).columns.tolist()

print("Numeric features:", numeric_features)
print("Categorical features:", categorical_features)

# Create a preprocessing pipeline
numeric_transformer = StandardScaler()
categorical_transformer = OneHotEncoder(handle_unknown='ignore')

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ])

# Fit and transform the training data
X_train_processed = preprocessor.fit_transform(X_train)
X_test_processed = preprocessor.transform(X_test)

print("Data preprocessing completed.")

import matplotlib.pyplot as plt

# Exploratory Data Analysis (EDA)

# Plot the distribution of the target variable
plt.figure(figsize=(6, 4))
sns.countplot(x=y)
plt.title("Distribution of Win Status")
plt.xlabel("Win Status")
plt.ylabel("Count")
plt.show()

# Plot the correlation matrix
plt.figure(figsize=(12, 8))
corr_matrix = data[numeric_features].corr()
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', fmt='.2f')
plt.title("Correlation Matrix")
plt.show()

# Plot the distribution of numerical features
for col in numeric_features:
    plt.figure(figsize=(6, 4))
    sns.histplot(data[col], kde=True)
    plt.title(f"Distribution of {col}")
    plt.xlabel(col)
    plt.ylabel("Frequency")
    plt.show()

# Plot the count of categorical features
for col in categorical_features:
    plt.figure(figsize=(12, 6))
    sns.countplot(y=data[col], order=data[col].value_counts().index)
    plt.title(f"Count of {col}")
    plt.xlabel("Count")
    plt.ylabel(col)
    plt.show()

print("Exploratory Data Analysis (EDA) completed.")

# Save the preprocessed data
# Save the preprocessed data
pd.DataFrame(X_train_processed).to_csv("X_train_processed.csv", index=False)
pd.DataFrame(X_test_processed).to_csv("X_test_processed.csv", index=False)
pd.DataFrame(y_train).to_csv("y_train.csv", index=False)
pd.DataFrame(y_test).to_csv("y_test.csv", index=False)

print("Preprocessed data saved.")


import joblib
from sklearn.ensemble import RandomForestClassifier

# Assuming X_train_processed, X_test_processed, y_train, y_test are already defined
# Save the preprocessor as a pickle file
joblib.dump(preprocessor, "preprocessing.pkl")
joblib.dump(X_train_processed, "X_train_processed.pkl")
joblib.dump(X_test_processed, "X_test_processed.pkl")
joblib.dump(y_train, "y_train.pkl")
joblib.dump(y_test, "y_test.pkl")
# Train a RandomForestClassifier model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_processed, y_train)

# Save the trained model
joblib.dump(model, "tender_win_prediction_model.pkl")

print("Model training and saving completed.")


