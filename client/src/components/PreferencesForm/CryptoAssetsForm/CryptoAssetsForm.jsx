import { Stack, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function CryptoAssetsForm({ cryptoAssets, setCryptoAssets }) {
  const contentOptions = [
    "BTC (Bitcoin)",
    "ETH (Etherium)",
    "SOL (Solana)",
    "BNB (Binance Coin)",
    "ADA (Cardano)",
  ];

  const handleToggle = (option) => {
    const symbol = option.split(" ")[0];
    if (cryptoAssets.includes(symbol)) {
      setCryptoAssets(cryptoAssets.filter((item) => item !== symbol));
    } else {
      setCryptoAssets([...cryptoAssets, symbol]);
    }
  };

  return (
    <Stack spacing={2} sx={{ p: 3 }}>
      <h2>Select Your Crypto Assets</h2>
      <FormGroup>
        {contentOptions.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={cryptoAssets.includes(option.split(" ")[0])}
                onChange={() => handleToggle(option)}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </Stack>
  );
}
