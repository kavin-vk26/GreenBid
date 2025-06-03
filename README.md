# 🌱 Optimizing Green Bids in Construction & Infrastructure Using AI

A web-based platform designed to streamline tender creation, bidder submissions, and AI-driven winning bid prediction. By factoring in sustainability investments and environmental impact, this project helps decision-makers choose greener bids—ensuring construction and infrastructure projects prioritize both cost and eco-friendliness.

---

## 📖 Project Overview

Optimizing Green Bids is focused on making procurement processes in construction and infrastructure more sustainable. By combining real-time tender management with an AI model that evaluates bids based on both price and environmental impact, the platform empowers stakeholders to select offers that align with green goals without sacrificing cost efficiency. This solution targets organizations and agencies that aim to reduce carbon footprint and encourage eco-friendly practices in large-scale projects.

---

## 🚀 Key Features

- **Tender Management**  
  Authorities can create and publish tenders by providing essential details:
  - Tender ID  
  - Project Name  
  - Budget  
  - Deadline  
  - Key Requirements  
  - Region  

- **Bidder Submission**  
  Registered bidders can view available tenders and submit their proposals, including:
  - Bidder Name  
  - Bid Amount  
  - Sustainability Investments  
  - Predicted Environmental Impact  

- **AI-Powered Winning Bid Prediction**  
  A custom machine learning model evaluates incoming bids, weighing cost against sustainability factors. The model runs on a Flask backend and returns a recommended “winning bidder” based on predicted environmental impact and overall value.

- **Real-Time Data Storage & Updates**  
  All tender and bid information is stored in Cloud Firestore. Real-time synchronization ensures that stakeholders always see the most up-to-date list of tenders and submitted bids.

- **Anonymous Authentication**  
  Firebase Authentication (Anonymous) allows both tender creators and bidders to interact with the system without traditional sign-up barriers—ideal for quick, low-friction access in field scenarios.

- **Responsive User Interface**  
  Built with React and TailwindCSS, the UI is clean and mobile-friendly. Interactive forms enable intuitive tender creation, bid submissions, and AI-driven result dialogs.

---

## 🛠️ Tech Stack

- **Frontend**  
  - React (Functional components, Hooks)  
  - TailwindCSS (Utility-first styling)  
  - Firebase SDK (Auth, Firestore, Analytics)  

- **Backend**  
  - Flask (Python)  
  - Custom ML model (framework-agnostic) served via `/api/predict` endpoint  

- **Database & Hosting**  
  - Firebase Firestore (NoSQL, real-time data)  
  - Firebase Authentication (Anonymous sign-in)  
  - Firebase Analytics  

---

## 🔄 Data Flow & Interaction

1. **Tender Creation**  
   - Administrators or authorities access the Tender form, enter project details, and submit.  
   - Data is saved to the “tenders” collection in Firestore.

2. **Bid Submission**  
   - Bidders browse available tenders, select one, and submit their bid details.  
   - Bid information (including sustainability metrics) is saved under the “bidders” collection.

3. **Winning Bid Prediction**  
   - Once bids are submitted, selecting “Predict Winning Bidder” sends bidder data (bid amount, sustainability investments, predicted environmental impact) to the Flask endpoint.  
   - Flask processes the payload through a machine learning model and returns a JSON response indicating the top bidder— balancing cost and environmental considerations.

4. **UI Feedback**  
   - A modal dialog displays the predicted winner, ensuring stakeholders can immediately see the recommended bid.

---

## 📊 Project Status

| Feature                        | Status        | GitHub Hosted |
|--------------------------------|---------------|---------------|
| Tender Creation & Storage      | Completed ✅   | Yes           |
| Bidder Submission & Storage    | Completed ✅   | Yes           |
| AI Winning Bid Prediction      | Completed ✅   | Yes           |
| Responsive UI & Styling        | Completed ✅   | Yes           |
| Anonymous Authentication       | Completed ✅   | Yes           |
| Real-Time Analytics Integration| Completed ✅   | Yes           |

> All core modules are fully implemented, tested, and available in this repository. The ML-powered prediction endpoint is live in the `backend/` folder.

---

## 🤝 Contributions & Collaboration

Contributions are welcome! Whether you’d like to:
- Improve the AI model  
- Enhance user interface components  
- Add new sustainability metrics or features  

Fork the repository, create a branch (e.g., `feature/your-feature`), make your changes, and submit a pull request. All improvement ideas are encouraged.

---

## 📄 License

This project is distributed under the MIT License. See [LICENSE](LICENSE) for full details.

---

## 📞 Contact

- **Maintainer:** Hareeshwar N K 
- **Email:** hareeshwarnk@gmail.com  

---

> Made with 💚 to promote sustainable infrastructure and data-driven decision-making in construction.  
