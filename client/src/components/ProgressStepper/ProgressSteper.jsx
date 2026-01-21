import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = [
  "Select Crypto Assets",
  "What Type of Investor Are You?",
  "Select Your Desired Content",
];

// TODO: Get the Back/Next buttons to be at the bottom of the page!
export default function ProgressStepper({
  activeStep,
  setActiveStep,
  onFinish,
  canProceed,
}) {
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onFinish();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "60%", margin: "0 auto" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel 
                sx={{ 
                  '& .MuiStepLabel-label': { 
                    color: 'rgba(209, 209, 209, 0.87)',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif',
                  },
                  '& .MuiStepLabel-label.Mui-active': {
                    color: 'rgba(209, 209, 209, 0.87)',
                  },
                  '& .MuiStepLabel-label.Mui-completed': {
                    color: 'rgba(209, 209, 209, 0.87)',
                  }
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ 
              mr: 1,
              '&.Mui-disabled': { color: 'gray' }
            }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
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
      </React.Fragment>
    </Box>
  );
}
