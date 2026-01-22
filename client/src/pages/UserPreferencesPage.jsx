import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ProgressStepper from "../components/ProgressStepper/ProgressSteper";
import CryptoAssetsForm from "../components/PreferencesForm/CryptoAssetsForm/CryptoAssetsForm";
import InterestsForm from "../components/PreferencesForm/InterestsForm/InterestsForm";
import TypeInvestorForm from "../components/PreferencesForm/TypeInvestorForm/TypeInvestorForm";
import { isLoggedIn } from "../utils/auth";


const steps = [
  "Select Crypto Assets",
  "What Type of Investor Are You?",
  "Select Your Desired Content",
];


export default function UserPreferencesPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [investorType, setInvestorType] = useState("");
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
      return;
    }
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

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '50vh' }}>
      <ProgressStepper activeStep={activeStep} />
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flex: 1,
        padding: '1rem'
      }}>
        {renderStep()}
      </div>

      <Box sx={{ 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "center",
        padding: '2rem',
        gap: '1rem'
      }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ 
            '&.Mui-disabled': { color: 'gray' }
          }}
        >
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!canProceed()}
          sx={{
            '&.Mui-disabled': { color: 'gray' }
          }}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </div>
  );
}