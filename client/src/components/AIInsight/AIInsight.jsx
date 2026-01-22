import { CircularProgress, Typography, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function AIInsight({ insight }) {
  if (!insight) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Paper
      elevation={2}
      sx={{
        padding: 3,
        background: "transparent",
        border: "2px solid rgba(94, 114, 228, 0.3)",
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
        <AutoAwesomeIcon
          sx={{
            color: "#5e72e4",
            fontSize: 28,
            mt: 0.5,
            flexShrink: 0,
          }}
        />
        <Typography
          variant="body1"
          sx={{
            fontSize: "1.05rem",
            lineHeight: 1.7,
            color: "rgba(255, 255, 255, 0.9)",
            fontWeight: 400,
            letterSpacing: "0.02em",
          }}
        >
          {insight}
        </Typography>
      </Box>
    </Paper>
  );
}
