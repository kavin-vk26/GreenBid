"use client";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVS9jpFQJ30E6EBuiBqfU34t1J2DSK1Tc",
  authDomain: "biddb-e9ccf.firebaseapp.com",
  projectId: "biddb-e9ccf",
  storageBucket: "biddb-e9ccf.firebasestorage.app",
  messagingSenderId: "369877102209",
  appId: "1:369877102209:web:5858cef6ff2bd2af73e780",
  measurementId: "G-9S5NX27CY2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});
const db = getFirestore(app);
const auth = getAuth(app);

signInAnonymously(auth)
  .then(() => {
    console.log("Signed in anonymously");
  })
  .catch((error) => {
    console.error("Error signing in anonymously: ", error);
  });

function MainComponent() {
  const [showTenderForm, setShowTenderForm] = useState(false);
  const [showBidderForm, setShowBidderForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [showTenders, setShowTenders] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  const [tenders, setTenders] = useState([]);
  const [selectedTender, setSelectedTender] = useState(null);
  const [tenderFormData, setTenderFormData] = useState({
    tenderId: "",
    projectName: "",
    budget: "",
    deadline: "",
    keyRequirements: "",
    region: "",
  });

  const [bidFormData, setBidFormData] = useState({
    bidderName: "",
    bidAmount: "",
    sustainabilityInvestments: "",
    predictedEnvironmentalImpact: "",
  });

  const handleTenderFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tenders"), tenderFormData);
      setDialogMessage("Tender details saved successfully!");
      setShowDialog(true);
    } catch (e) {
      console.error("Error adding document: ", e);
      setDialogMessage("Error saving tender details. Please try again.");
      setShowDialog(true);
    }
  };

  const handleBidFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "bidders"), bidFormData);
      setDialogMessage("Bidder details saved successfully!");
      setShowDialog(true);
      setBidFormData({
        bidderName: "",
        bidAmount: "",
        sustainabilityInvestments: "",
        predictedEnvironmentalImpact: "",
      });
    } catch (error) {
      console.error("Error saving bidder:", error);
      setDialogMessage("Error saving bidder details. Please try again.");
      setShowDialog(true);
    }
  };

  const handleBidFormChange = (e) => {
    setBidFormData({
      ...bidFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectWinningBidder = async (bidderData) => {
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidderData),
      });
      const result = await response.json();
      setDialogMessage(`The selected bidder is: ${result.prediction}`);
      setShowDialog(true);
    } catch (error) {
      console.error("Error predicting winning bidder: ", error);
      setDialogMessage("Error predicting winning bidder. Please try again.");
      setShowDialog(true);
    }
  };

  useEffect(() => {
    const loadTenders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tenders"));
        const tenderData = querySnapshot.docs.map(doc => doc.data());
        setTenders(tenderData);
      } catch (error) {
        console.error("Error loading tenders: ", error);
      }
    };

    loadTenders();
  }, [showTenders]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
          Optimizing Green Bids in Construction & Infrastructure Using AI
        </h1>

        {!showTenderForm && !showBidderForm && !showTenders && (
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowTenderForm(true)}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            >
              Tender Login
            </button>
            <button
              onClick={() => setShowBidderForm(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Bidder Login
            </button>
            <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600">
              Winning Bidder
            </button>
          </div>
        )}

        {showTenderForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Tender Details</h2>
              <button
                onClick={() => setShowTenderForm(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back to Login
              </button>
            </div>
            <form onSubmit={handleTenderFormSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="tenderId"
                  placeholder="Tender ID"
                  value={tenderFormData.tenderId}
                  onChange={(e) =>
                    setTenderFormData({
                      ...tenderFormData,
                      tenderId: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="projectName"
                  placeholder="Project Name"
                  value={tenderFormData.projectName}
                  onChange={(e) =>
                    setTenderFormData({
                      ...tenderFormData,
                      projectName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  name="budget"
                  placeholder="Budget"
                  value={tenderFormData.budget}
                  onChange={(e) =>
                    setTenderFormData({
                      ...tenderFormData,
                      budget: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <input
                  type="date"
                  name="deadline"
                  placeholder="Deadline"
                  value={tenderFormData.deadline}
                  onChange={(e) =>
                    setTenderFormData({
                      ...tenderFormData,
                      deadline: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <textarea
                  name="keyRequirements"
                  placeholder="Key Requirements"
                  value={tenderFormData.keyRequirements}
                  onChange={(e) =>
                    setTenderFormData({
                      ...tenderFormData,
                      keyRequirements: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="region"
                  placeholder="Region"
                  value={tenderFormData.region}
                  onChange={(e) =>
                    setTenderFormData({
                      ...tenderFormData,
                      region: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {showBidderForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Bidder Details</h2>
              <button
                onClick={() => setShowBidderForm(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back to Login
              </button>
            </div>
            <form onSubmit={handleBidFormSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="bidderName"
                  placeholder="Bidder Name"
                  value={bidFormData.bidderName}
                  onChange={handleBidFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  name="bidAmount"
                  placeholder="Bid Amount"
                  value={bidFormData.bidAmount}
                  onChange={handleBidFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  name="sustainabilityInvestments"
                  placeholder="Sustainability Investments"
                  value={bidFormData.sustainabilityInvestments}
                  onChange={handleBidFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  name="predictedEnvironmentalImpact"
                  placeholder="Predicted Environmental Impact"
                  value={bidFormData.predictedEnvironmentalImpact}
                  onChange={handleBidFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowTenders(true)}
                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                See Available Tender
              </button>
            </form>
          </div>
        )}

        {showTenders && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Available Tenders</h2>
              <button
                onClick={() => setShowTenders(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back
              </button>
            </div>
            <div className="space-y-4">
              {tenders.map((tender) => (
                <div key={tender.id} className="border p-4 rounded">
                  <h3 className="font-bold">{tender.projectName}</h3>
                  <p>Tender ID: {tender.tenderId}</p>
                  <p>Budget: ${tender.budget}</p>
                  <p>Deadline: {tender.deadline}</p>
                  <p>Region: {tender.region}</p>
                  <button
                    onClick={() => {
                      setSelectedTender(tender);
                      setShowBidForm(true);
                    }}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Bid
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {showBidForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Submit Bid</h2>
              <form onSubmit={handleBidFormSubmit} className="space-y-4">
                <input
                  type="text"
                  name="tenderId"
                  value={selectedTender.tenderId}
                  className="w-full p-2 border rounded"
                  disabled
                />
                <input
                  type="text"
                  name="bidderName"
                  placeholder="Bidder Name"
                  value={bidFormData.bidderName}
                  onChange={handleBidFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="bidAmount"
                  placeholder="Bid Amount"
                  value={bidFormData.bidAmount}
                  onChange={handleBidFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="sustainabilityInvestments"
                  placeholder="Sustainability Investments"
                  value={bidFormData.sustainabilityInvestments}
                  onChange={handleBidFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="predictedEnvironmentalImpact"
                  placeholder="Predicted Environmental Impact"
                  value={bidFormData.predictedEnvironmentalImpact}
                  onChange={handleBidFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                  >
                    Submit Bid
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBidForm(false)}
                    className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectWinningBidder(bidFormData)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                  >
                    Select Winning Bidder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <p className="text-xl">{dialogMessage}</p>
              <button
                onClick={() => {
                  setShowDialog(false);
                  setDialogMessage("");
                }}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;