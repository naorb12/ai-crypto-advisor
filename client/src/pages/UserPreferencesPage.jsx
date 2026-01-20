import { useState } from "react";
import { useNavigate } from "react-router";

export default function UserPreferencesPage() {
  const navigate = useNavigate();
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [investorType, setInvestorType] = useState([]);
  const [interests, setInterests] = useState([]);

  async function handleSubmit() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_SERVER}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          typeOfInvestor: investorType,
          assets: cryptoAssets,
          interests: interests,
        }),
      });
      if (response.ok) {
        navigate("/dashboard");
      } else {
        console.log("Failed to set user preferences");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return <></>;
}
