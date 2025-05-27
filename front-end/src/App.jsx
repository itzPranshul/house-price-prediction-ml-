// src/App.jsx
import Header from "./components/Header";
import PredictionForm from "./components/PredictionForm";

function App() {
  return (
    <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh", padding: "20px" }}>
      <Header />
      <PredictionForm />
    </div>
  );
}

export default App;
