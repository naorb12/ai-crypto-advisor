import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export default function Feedback() {
  return (
    <div className="feedback">
      <button>
        <ThumbUpIcon sx={{ color: "green" }} />
      </button>
      <button>
        <ThumbDownIcon sx={{ color: "pink" }} />
      </button>
    </div>
  );
}
