import {
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function TypeInvestorForm({ investorType, setInvestorType }) {
  return (
    <Stack spacing={2} sx={{ p: 3 }}>
      <h2>What Type of Investor Are You?</h2>
      <FormControl>
        <RadioGroup
          value={investorType}
          onChange={(e) => setInvestorType(e.target.value)}
        >
          <FormControlLabel value="HODLer" control={<Radio />} label="HODLer" />
          <FormControlLabel
            value="NFT Collector"
            control={<Radio />}
            label="NFT Collector "
          />
          <FormControlLabel
            value="Day Trader"
            control={<Radio />}
            label="Day Trader - High risk, high potential returns"
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}
