# 🏗️ GreenBid – AI-Driven Green Tender Evaluation System  
*A sustainability-focused bid analysis platform for infrastructure projects*

---

## 📌 Overview

**GreenBid** is an intelligent, AI-powered platform designed to modernize tender evaluation in the construction and infrastructure industry. It allows government or private tender issuers to assess bids not only based on cost and time but also on **environmental sustainability**.

The system is equipped with a **machine learning model trained on environmental and construction datasets** to generate a **Green Score** for each bidder based on predicted CO₂ emissions, material impact, and energy usage. The platform encourages **eco-conscious project planning**, creating a fair opportunity for green contractors to stand out.

---

## 🎯 Goals & Objectives

- Predict and assign **environmental sustainability scores** using trained ML models  
- Enable **data-driven tender selection** that balances cost, time, and green impact  
- Encourage the use of **eco-friendly materials and practices** in the construction industry  
- Build a modular backend ready for government and enterprise integration

---

## 🚀 Key Features

- 🔬 **ML-Based Green Scoring**: Uses machine learning to evaluate each bid’s environmental impact  
- 📊 **Weighted Evaluation Logic**: Final scores are computed using customizable weights (e.g., 50% cost, 30% sustainability, 20% time)  
- 🧾 **Bidder Submission Portal**: Bidders upload proposal details, material usage, energy plan, etc.  
- 🧠 **Admin Dashboard**: For tender creators to view submissions and auto-calculated ranking  
- 📁 **Modular Backend**: Designed for future integration with government platforms (e.g., GeM, TN-Tenders)

---

## 👨‍💻 My Contribution (Kavin V.K.)

As the **Machine Learning Developer** on the GreenBid team, I was responsible for building the intelligence behind the **environmental evaluation engine**.

### 🔧 ML Model Development for Sustainability Scoring

- Collected and cleaned datasets related to:
  - **Material carbon footprints**
  - **Energy consumption per building type**
  - **Typical emissions in various construction phases**
- Engineered input features like:
  - Material type and quantity
  - Distance of sourcing (transport emissions)
  - Planned equipment energy usage
  - Project duration
- Trained classification and regression models to predict:
  - Estimated CO₂ emissions (kg)
  - Sustainability rating (1–5 stars)
- Algorithms used:
  - Random Forest Regressor  
  - Gradient Boosting Regressor  
  - Logistic Regression (for green vs. non-green labels)

---

### 🌱 Green Scoring System

- Developed a **Green Score formula** integrating:
  - Emission prediction
  - Material sustainability rating
  - Renewable energy usage indicators
- Created a scaled output (0–100) for use in final evaluation:

green_score = 100 - (co2_emission_weighted + non_eco_material_penalty + energy_usage_factor)

### 🏗️ Architecture Design Support

- Documented expected input schema and helped the backend team integrate model predictions into scoring logic  
- Provided a clear flow of how the Green Score would impact overall bid rankings  
- Proposed modular endpoints and scoring weights for seamless integration with future backend logic

---

### 🛠️ Tech Stack

| Layer               | Tools Used                |
|---------------------|---------------------------|
| ML Model Training   | Python, scikit-learn, pandas |
| Scoring Engine      | Python                    |
| Backend Design      | Flask (proposed)          |
| Data Format         | JSON, CSV                 |
| Visualization       | matplotlib, seaborn       |

---

### 🚀 Future Enhancements

- Integrate with live material emission databases (e.g., ICE, Ecoinvent)  
- Add visual analytics dashboard for emissions comparison  
- Develop full REST API for model serving  
- Integrate blockchain for bid record immutability  
- Host on cloud with Docker and CI/CD pipeline  

---

### 👥 Team Credits

> This project was originally built for a **January 2025 Hackathon** with the theme:  
> _“Tender and Bid Optimization in the Construction and Infrastructure Industry”_

- **Kavin V.K.** – ML model for green scoring, sustainability logic design  
- **Harini K, Aishwaryaa K** – Frontend development and UI flow  
- **Hareeshwar N K** – Backend integration and admin dashboard  

---

### 📄 License

This project is licensed under the **MIT License**. You are free to reuse or build upon it with proper attribution.

---

### 🔗 Links

- 📁 Repository: [https://github.com/kavin-vk26/GreenBid](https://github.com/kavin-vk26/GreenBid)  
- 📧 Email: vkkavin2006@gmail.com  
- 💼 LinkedIn: [itzmekavinvk26](https://www.linkedin.com/in/itzmekavinvk26)

---
