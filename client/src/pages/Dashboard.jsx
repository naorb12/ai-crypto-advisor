import { useEffect, useState } from "react";
import { isLoggedIn } from "../utils/auth";
import { useNavigate } from "react-router";
import "./Dashboard.css";
import MarketNews from "../components/MarketNews/MarketNews";
import Feedback from "../components/Feedback/Feedback";

export default function Dashboard() {
  const navigate = useNavigate();
  const [marketNews, setMarketNews] = useState([]);
  const [coinPrices, setCoinPrices] = useState();
  const [aiInsight, setAiInsight] = useState("");
  const [memeURL, setMemeURL] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    async function fetchDashboard() {
      if (!isLoggedIn()) {
        navigate("/");
        return;
      }
      if (sessionStorage.getItem("onboardingCompleted") === "false") {
        console.log("logged in ");
        navigate("/user-preferences");
        return;
      }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER}/dashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const { newsArticles, coinPrices, aiInsight, meme } =
            await response.json();
          setMarketNews(newsArticles);
          setCoinPrices(coinPrices);
          setAiInsight(aiInsight);
          console.log(meme.url);
          setMemeURL(meme.url);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <div className="dashboard">
      <section className="section section-1">
        <h2>Market News</h2>
        <div className="content">
          <MarketNews articles={marketNews} />
        </div>
        <Feedback />
      </section>

      <section className="section section-2">
        <h2>Coin Prices</h2>
        <div className="content">
          {coinPrices &&
            Object.entries(coinPrices).map(([symbol, data]) => {
              return (
                <div key={symbol} className="coin-price">
                  <span className="coin-symbol">{symbol.toUpperCase()}</span>
                  <span className="coin-value">${data.usd}</span>
                </div>
              );
            })}
        </div>
        <Feedback />
      </section>

      <section className="section section-3">
        <h2>AI Insight of The Day!</h2>
        <div className="content">{aiInsight}</div>
        <Feedback />
      </section>

      <section className="section section-4">
        <h2>Fun Meme</h2>
        <div className="content">
          <img className="meme" src={memeURL} alt="crypto-meme" />
        </div>
        <Feedback />
      </section>
    </div>
  );
}

// TODO: Caching:
// useEffect(() => {
//   async function fetchDashboard() {
//     if (!isLoggedIn()) {
//       navigate("/");
//       return;
//     }
//     if (sessionStorage.getItem("onboardingCompleted") === "false") {
//       console.log("logged in ");
//       navigate("/user-preferences");
//       return;
//     }

//     // Load cached data first
//     const cached = localStorage.getItem("dashboardData");
//     if (cached) {
//       const { newsArticles, coinPrices, aiInsight, meme } = JSON.parse(cached);
//       setMarketNews(newsArticles || []);
//       setCoinPrices(coinPrices);
//       setAiInsight(aiInsight || "");
//       if (meme?.url) setMemeURL(meme.url);
//     }

//     try {
//       console.log("About to fetch dashboard");
//       const response = await fetch(
//         `${import.meta.env.VITE_SERVER}/dashboard`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       console.log(response);

//       if (response.ok) {
//         const data = await response.json();
//         const { newsArticles, coinPrices, aiInsight, meme } = data;
//         console.log(newsArticles);
//         console.log(meme);

//         setMarketNews(newsArticles);
//         setCoinPrices(coinPrices);
//         setAiInsight(aiInsight);
//         if (meme?.url) setMemeURL(meme.url);

//         // Cache the data
//         localStorage.setItem("dashboardData", JSON.stringify(data));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   fetchDashboard();
// }, []);
