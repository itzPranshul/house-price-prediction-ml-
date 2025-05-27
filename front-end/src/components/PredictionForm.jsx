// src/components/PredictionForm.jsx
import { useEffect } from "react";
import { useState } from "react";
import "./PredictionForm.css";


export default function PredictionForm() {
  useEffect(() => {
  console.log("🔧 PredictionForm mounted");
}, []);

  const [form, setForm] = useState({
    area: "",
    bedroom: "",
    bathroom: "",
    floorNum: "",
  });
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("button clicked", form);

  try {
    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        features: [
          parseFloat(form.area),
          parseInt(form.bedroom),
          parseInt(form.bathroom),
          parseInt(form.floorNum),
        ],
      }),
    });

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();
    console.log("Response JSON:", data);
    setPredictedPrice(Math.round(data.prediction));
  } catch (error) {
    console.error("Prediction error:", error);
  }
};


  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="prediction-form">
        <input
          type="number"
          name="area"
          placeholder="Area (sq ft)"
          value={form.area}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="bedroom"
          placeholder="Number of Bedrooms"
          value={form.bedroom}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="bathroom"
          placeholder="Number of Bathrooms"
          value={form.bathroom}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="floorNum"
          placeholder="Floor Number"
          value={form.floorNum}
          onChange={handleChange}
          required
        />
        <button type="submit">Predict Price</button>
      </form>

      {predictedPrice !== null && (
  <div className="result">
    <h2 className="text" >🏠 Estimated House Price</h2>
    <p className="price-display">₹ {predictedPrice.toLocaleString("en-IN")} Lakhs</p>
  </div>
)}
    </div>
  );
}
