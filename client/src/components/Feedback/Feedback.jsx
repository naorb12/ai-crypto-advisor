import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export default function Feedback({ section, snapshot }) {
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  async function handleFeedback(feedbackType, section, snapshot) {
    setSelectedFeedback(feedbackType);
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_SERVER}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          section: section,
          feedbackType: feedbackType,
          contentSnapshot: snapshot,
        }),
      });

      if (!response.ok) {
        setSelectedFeedback(null);
      }
    } catch (err) {
      console.log(err);
      selectedFeedback(null);
    }
  }

  const getOpacity = (buttonType) => {
    if (!selectedFeedback) return 1;
    return selectedFeedback === buttonType ? 0.45 : 0.1;
  };

  return (
    <div className="feedback">
      <IconButton
        onClick={() => handleFeedback("like", section, snapshot)}
        disabled={selectedFeedback !== null}
        style={{ opacity: getOpacity("like") }}
      >
        <ThumbUpIcon sx={{ color: "green" }} />
      </IconButton>
      <IconButton
        onClick={() => handleFeedback("dislike", section, snapshot)}
        disabled={selectedFeedback !== null}
        style={{ opacity: getOpacity("dislike") }}
      >
        <ThumbDownIcon
          sx={{
            color: "pink",
          }}
        />
      </IconButton>{" "}
    </div>
  );
}
