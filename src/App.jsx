import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getStock = async () => {

    if (!symbol) {
      alert("Enter stock symbol");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.get(
        `https://stock-market-api-81xw.onrender.com/api/v1/stocks/${symbol}/price`
      );

      console.log(response.data);

      setData(response.data);

    } catch  {

      alert("Stock not found 😭");
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
              NSE / BSE Live Analysis Platform
            </p>

          </div>

          <div className="search-box">

            <input
              type="text"
              placeholder="Enter NSE Symbol (RELIANCE, TCS, INFY)"
              value={symbol}
              onChange={(e) =>
                setSymbol(e.target.value.toUpperCase())
              }
            />

            <button onClick={getStock}>

              {loading ? "Loading..." : "Get Live Price"}

            </button>

          </div>

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