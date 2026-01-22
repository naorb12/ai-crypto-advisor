import { useEffect, useState } from "react";
import { isLoggedIn } from "../utils/auth";
import { useNavigate } from "react-router";
import "./Dashboard.css";
import MarketNews from "../components/MarketNews/MarketNews";
import CoinPrices from "../components/CoinPrices/CoinPrices";
import AIInsight from "../components/AIInsight/AIInsight";
import Meme from "../components/Meme/Meme";
import Feedback from "../components/Feedback/Feedback";
import { CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [marketNews, setMarketNews] = useState([]);
  const [coinPrices, setCoinPrices] = useState();
  const [aiInsight, setAiInsight] = useState();
  const [meme, setMeme] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const token = sessionStorage.getItem("token");

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

    setRefreshing(true);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Fetch all sections in parallel
    const fetchNews = fetch(`${import.meta.env.VITE_SERVER}/dashboard/news`, {
      headers,
    })
      .then((r) => r.json())
      .then((data) => setMarketNews(data.newsArticles))
      .catch((err) => console.error("News error:", err));

    const fetchPrices = fetch(
      `${import.meta.env.VITE_SERVER}/dashboard/prices`,
      { headers },
    )
      .then((r) => r.json())
      .then((data) => setCoinPrices(data.coinPrices))
      .catch((err) => console.error("Prices error:", err));

    const fetchAI = fetch(
      `${import.meta.env.VITE_SERVER}/dashboard/ai-insight`,
      { headers },
    )
      .then((r) => r.json())
      .then((data) => setAiInsight(data.aiInsight))
      .catch((err) => console.error("AI error:", err));

    const fetchMeme = fetch(`${import.meta.env.VITE_SERVER}/dashboard/meme`, {
      headers,
    })
      .then((r) => r.json())
      .then((data) => setMeme(data.meme))
      .catch((err) => console.error("Meme error:", err));

    await Promise.allSettled([fetchNews, fetchPrices, fetchAI, fetchMeme]);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboard();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 2rem",
          marginBottom: "1rem",
        }}
      >
        <h1>Welcome To Your Dashboard!</h1>
        <IconButton
          onClick={handleRefresh}
          disabled={refreshing}
          sx={{ color: "rgba(209, 209, 209, 0.87)" }}
        >
          {refreshing ? (
            <CircularProgress
              size={24}
              sx={{ color: "rgba(209, 209, 209, 0.87)" }}
            />
          ) : (
            <AutorenewIcon fontSize="large" />
          )}
        </IconButton>
      </div>

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
            <CoinPrices prices={coinPrices} />
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
          <div className="content">
            <AIInsight insight={aiInsight} />
          </div>
          {aiInsight && (
            <Feedback
              className="feedback"
              section={"ai"}
              snapshot={aiInsight}
            />
          )}
        </section>

        <section className="section section-4">
          <h2>Fun Meme</h2>
          <div className="content">
            <Meme meme={meme} />
          </div>
          {meme && (
            <Feedback className="feedback" section={"meme"} snapshot={meme} />
          )}
        </section>
      </div>
    </>
  );
}
