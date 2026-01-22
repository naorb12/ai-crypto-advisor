import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  "Select Crypto Assets",
  "What Type of Investor Are You?",
  "Select Your Desired Content",
];

export default function ProgressStepper({ activeStep }) {
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
    </Box>
  );
}