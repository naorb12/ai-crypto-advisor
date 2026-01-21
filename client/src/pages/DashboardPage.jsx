import { useEffect, useState } from "react";
import { isLoggedIn } from "../utils/auth";
import { useNavigate } from "react-router";
import "./Dashboard.css";
import MarketNews from "../components/MarketNews/MarketNews";
import Feedback from "../components/Feedback/Feedback";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [marketNews, setMarketNews] = useState([]);
  const [coinPrices, setCoinPrices] = useState();
  const [aiInsight, setAiInsight] = useState();
  const [meme, setMeme] = useState(null);
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
          const {
            newsArticles,
            coinPrices: coinPricesFetched,
            aiInsight: aiInsightFetched,
            meme: memeFetched,
          } = await response.json();
          setMarketNews(newsArticles);
          setCoinPrices(coinPricesFetched);
          setAiInsight(aiInsightFetched);
          setMeme(memeFetched);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <>
      {" "}
      <h1>Wecome To Your Dashboard!</h1>
      <div className="dashboard">
        <section className="section section-1">
          <h2>Market News</h2>
          <div className="content">
            <MarketNews articles={marketNews} />
          </div>
          {marketNews.length > 0 && (
            <Feedback
              className="feedback"
              section={"news"}
              snapshot={marketNews}
            />
          )}
        </section>

        <section className="section section-2">
          <h2>Coin Prices</h2>
          <div className="content">
            {coinPrices ? (
              Object.entries(coinPrices).map(([symbol, data]) => {
                return (
                  <div key={symbol} className="coin-price">
                    <span className="coin-symbol">{symbol.toUpperCase()}</span>
                    <span className="coin-value">${data.usd}</span>
                  </div>
                );
              })
            ) : (
              <Box sx={{ gridColumn: '1 / -1', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                width: '100%'
              }}>
                <CircularProgress />
              </Box>
            )}
          </div>
          {coinPrices && (
            <Feedback
              className="feedback"
              section={"coins"}
              snapshot={coinPrices}
            />
          )}
        </section>

        <section className="section section-3">
          <h2>AI Insight of The Day!</h2>
          <div className="content">{aiInsight}</div>
          {aiInsight ? (
            <Feedback
              className="feedback"
              section={"ai"}
              snapshot={aiInsight}
            />
          ) : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
              </Box>}
        </section>

        <section className="section section-4">
          <h2>Fun Meme</h2>
          <div className="content">
            {meme ? (
              <>
                <p>{meme.title}</p>
                <img className="meme" src={meme.url} alt="crypto-meme" />
              </>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
              </Box>
            )}
          </div>
          {meme && (
            <Feedback className="feedback" section={"meme"} snapshot={meme} />
          )}
        </section>
      </div>
    </>
  );
}
