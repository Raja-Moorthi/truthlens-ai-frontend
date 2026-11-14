
import { useState } from "react";
import axios from "axios";
import {
  ShieldCheck,
  Search,
  Newspaper,
  Brain,
  Activity,
  ShieldAlert
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
    setResult(null);

    try {
      const response = await axios.post(
        "https://truthlens-ai-backend-2.onrender.com/predict",
        { text: news }
      );

      if (response.data.success) {
        setResult(response.data);
      } else {
        alert(response.data.error || "Prediction failed!");
      }
    } catch (error) {
      console.error("Backend Error:", error);
      alert(
        error.response?.data?.error ||
        "Unable to connect to backend!"
      );
    } finally {
      setLoading(false);
    }
  };

  // IMPORTANT: Verify your dataset's label mapping first!
  // Current assumption: 0 = Fake, 1 = Real
  const isReal = result?.prediction === 1;

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
            <div className={`result-card ${isReal ? "real" : "fake"}`}>
              {isReal ? (
                <ShieldCheck size={40} />
              ) : (
                <ShieldAlert size={40} />
              )}

              <h3>News Classification</h3>

              <h2>
                {isReal ? "REAL NEWS" : "FAKE NEWS"}
              </h2>

              <p>
                {isReal
                  ? "The model classified this article as real."
                  : "The model classified this article as fake."}
              </p>
            </div>

            <div className="result-card">
              <Brain size={35} />
              <h3>Logistic Prediction</h3>
              <h2>{result.logistic_prediction}</h2>
            </div>

            <div className="result-card">
              <Activity size={35} />
              <h3>Model Prediction</h3>
              <h2>{result.prediction}</h2>
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
