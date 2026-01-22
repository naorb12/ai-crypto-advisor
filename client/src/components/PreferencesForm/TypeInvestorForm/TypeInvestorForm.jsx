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
      <FormControl>
        <RadioGroup
          value={investorType}
          onChange={(e) => setInvestorType(e.target.value)}
        >
          <FormControlLabel
            value="HODLer"
            control={<Radio />}
            label="HODLer - Long-term holder, low risk strategy"
          />
          <FormControlLabel
            value="NFT Collector"
            control={<Radio />}
            label="NFT Collector - Focus on digital art and collectibles"
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
