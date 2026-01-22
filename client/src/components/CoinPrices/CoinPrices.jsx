import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

export default function CoinPrices({ prices }) {
  return prices ? (
    <>
      {Object.entries(prices).map(([symbol, data]) => {
        return (
          <div key={symbol} className="coin-price">
            <span className="coin-symbol">{symbol.toUpperCase()}</span>
            <span className="coin-value">${data.usd}</span>
          </div>
        );
      })}
    </>
  ) : (
    <Box sx={{ 
      gridColumn: '1 / -1', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%'
    }}>
      <CircularProgress />
    </Box>
  );
}
