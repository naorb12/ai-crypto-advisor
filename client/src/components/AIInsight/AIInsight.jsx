import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

export default function AIInsight({ insight }) {
  if (!insight) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return <>{insight}</>;
}
