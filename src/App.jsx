
import { useState } from "react";
import axios from "axios";
import {
  ShieldCheck,
  Search,
  Newspaper,
  Brain,
  Activity
} from "lucide-react";
import "./App.css";

function App() {
  const [news, setNews] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeNews = async () => {
    if (!news.trim()) {
      alert("Please enter a news article!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        { news }
      );
      setResult(response.data);
    } catch {
      alert("Flask backend is not connected yet!");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <ShieldCheck size={30} />
          TruthLens AI
        </div>
        <span>AI NEWS ANALYZER</span>
      </nav>

      <section className="hero">
        <h1>
          Detect Fake News
          <br />
          <span>With Explainable AI</span>
        </h1>
        <p>
          Analyze news articles using Machine Learning,
          NLP and Explainable AI.
        </p>
      </section>

      <main className="container">
        <div className="card">
          <h2>
            <Newspaper /> News Analyzer
          </h2>

          <textarea
            placeholder="Paste your news article here..."
            value={news}
            onChange={(e) => setNews(e.target.value)}
          />

          <button onClick={analyzeNews} disabled={loading}>
            <Search />
            {loading ? "Analyzing..." : "Analyze News"}
          </button>
        </div>

        {result && (
          <div className="results">
            <div className="result-card">
              <Activity />
              <h3>Prediction</h3>
              <h2>{result.prediction}</h2>
            </div>

            <div className="result-card">
              <Brain />
              <h3>Confidence</h3>
              <h2>{result.confidence}%</h2>
            </div>

            <div className="result-card">
              <Activity />
              <h3>Sentiment</h3>
              <h2>{result.sentiment}</h2>
            </div>
          </div>
        )}
      </main>

      <footer>
        TruthLens AI | Explainable Fake News Detection
      </footer>
    </div>
  );
}

export default App;
