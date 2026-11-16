import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getStock = async () => {

    if (!symbol.trim()) {
      setError("Enter a stock symbol.");
      return;
    }

    try {

      setLoading(true);
      setError("");
      setData(null);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/v1/stocks/${encodeURIComponent(symbol.trim())}/price`,
        { timeout: 20000 }
      );


      setData(response.data);

    } catch (err) {

      setError(err.response?.status === 404 ? "Symbol not found. Check the exchange suffix." : "The data service is unavailable. Please retry.");
      setData(null);

    } finally {

      setLoading(false);

    }
  };

  return (
    <>

      <div className="background-overlay"></div>

      <div className="container">

        <div className="box">

          <div className="top-area">

            <div className="logo">
              📈
            </div>

            <h1 className="title">
              Stock Market
            </h1>

            <p className="subtitle">
              NSE / BSE Price Explorer
            </p>

          </div>

          <div className="search-box">

            <input
              aria-label="Stock symbol"
              type="text"
              placeholder="Enter NSE Symbol (RELIANCE, TCS, INFY)"
              value={symbol}
              onChange={(e) =>
                setSymbol(e.target.value.toUpperCase())
              }
            />

            <button onClick={getStock} disabled={loading}>

              {loading ? "Loading..." : "Get Price"}

            </button>

          </div>

          {error && <p role="alert">{error}</p>}
          <p>Provider prices may be delayed. Timestamp shows retrieval time.</p>
          {data && (

            <div className="card">

              <div className="stock-name">
                {data.symbol}
              </div>

              <div className="company-name">
                {data.company_name}
              </div>

              <div className="price">
                ₹ {data.current_price}
              </div>

              <div className="grid">

                <div className="info-box">
                  <span>📈 Change</span>
                  <strong>{data.change}</strong>
                </div>

                <div className="info-box">
                  <span>🚀 Change %</span>
                  <strong>{data.change_percent}%</strong>
                </div>

                <div className="info-box">
                  <span>📊 Volume</span>
                  <strong>{data.volume}</strong>
                </div>

                <div className="info-box">
                  <span>🏦 Market Cap</span>
                  <strong>{data.market_cap}</strong>
                </div>

                <div className="info-box">
                  <span>⬆ Day High</span>
                  <strong>{data.day_high}</strong>
                </div>

                <div className="info-box">
                  <span>⬇ Day Low</span>
                  <strong>{data.day_low}</strong>
                </div>

              </div>

              <div className="time">
                🕒 {data.timestamp}
              </div>

            </div>

          )}

        </div>

      </div>

      <div className="signature">
        Created by Saiteja
      </div>

    </>
  );
}

export default App;
