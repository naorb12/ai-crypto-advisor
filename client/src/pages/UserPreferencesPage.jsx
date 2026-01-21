import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ProgressStepper from "../components/ProgressStepper/ProgressSteper";
import CryptoAssetsForm from "../components/PreferencesForm/CryptoAssetsForm/CryptoAssetsForm";
import InterestsForm from "../components/PreferencesForm/InterestsForm/InterestsForm";
import TypeInvestorForm from "../components/PreferencesForm/TypeInvestorForm/TypeInvestorForm";
import { isLoggedIn } from "../utils/auth";

export default function UserPreferencesPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [investorType, setInvestorType] = useState("");
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (
      isLoggedIn() &&
      sessionStorage.getItem("onboardingCompleted") === "true"
    ) {
      console.log("logged in ");
      navigate("/dashboard");
    }
  });

  function canProceed() {
    switch (activeStep) {
      case 0:
        return cryptoAssets.length > 0;
      case 1:
        return investorType !== "";
      case 2:
        return interests.length > 0;
      default:
        return false;
    }
  }

  async function handleSubmit() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/user-preferences`,
        {
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
        },
      );
      if (response.ok) {
        sessionStorage.setItem("onboardingCompleted", true);
        navigate("/dashboard");
      } else {
        console.log("Failed to set user preferences");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <CryptoAssetsForm
            cryptoAssets={cryptoAssets}
            setCryptoAssets={setCryptoAssets}
          />
        );
      case 1:
        return (
          <TypeInvestorForm
            investorType={investorType}
            setInvestorType={setInvestorType}
          />
        );
      case 2:
        return (
          <InterestsForm interests={interests} setInterests={setInterests} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderStep()}
      <ProgressStepper
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        onFinish={handleSubmit}
        canProceed={canProceed}
      />
    </>
  );
}
