import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

export default function Meme({ meme }) {

  return (meme ? (<>
    <p>{meme.title}</p>
    <img className="meme" src={meme.url} alt="crypto-meme" />
  </>) : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
  );
}
