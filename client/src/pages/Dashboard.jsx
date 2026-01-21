import { useEffect, useState } from "react";
import { isLoggedIn } from "../utils/auth";
import { useNavigate } from "react-router";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [marketNews, setMarketNews] = useState();
  const [coinPrices, setCoinPrices] = useState();
  const [aiInsight, setAiInsight] = useState("");
  const [memeURL, setMemeURL] = useState("/public/def-crypto-meme.png");

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
    }
    if (sessionStorage.getItem("onboardingCompleted") === "false") {
      console.log("logged in ");
      navigate("/user-preferences");
    }
  });

  return (
    <div className="dashboard">
      <section className="section section-1">
        <h2>Section 1</h2>
        <div className="content">{/* Content for section 1 */}</div>
      </section>

      <section className="section section-2">
        <h2>Section 2</h2>
        <div className="content">{/* Content for section 2 */}</div>
      </section>

      <section className="section section-3">
        <h2>Section 3</h2>
        <div className="content">{/* Content for section 3 */}</div>
      </section>

      <section className="section section-4">
        <h2>Section 4</h2>
        <div className="content">{/* Content for section 4 */}</div>
      </section>
    </div>
  );
}
