import { Stack, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function InterestsForm({ interests, setInterests }) {
  const contentOptions = ["Market News", "Charts", "Social", "Fun"];

  const handleToggle = (option) => {
    if (interests.includes(option)) {
      setInterests(interests.filter((item) => item !== option));
    } else {
      setInterests([...interests, option]);
    }
  };

  return (
    <Stack spacing={2} sx={{ p: 3 }}>
      <h2>What Content Interests You?</h2>
      <FormGroup>
        {contentOptions.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={interests.includes(option)}
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
