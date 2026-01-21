import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../../utils/auth";

export default function LoginForm({ onSignUp }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLabel, setErrorLabel] = useState("");
  const [loading, setLoading] = useState(false);

  const deatilsNotFull = email === "" || password === "";

  async function handleLogin() {
    const result = await loginUser(email, password, setErrorLabel, setLoading);
    if (result.success) {
      if (!result.onboardingCompleted) {
        navigate("/user-preferences");
      } else {
        navigate("/dashboard");
      }
    }
  }
  return (
    <Stack id="auth-stack" spacing={1}>
      <h2>Please Login:</h2>
      <TextField
          value={email}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          sx={{ 
            '& .MuiInputBase-root': { fontSize: '1rem' },
            '& .MuiInputBase-input': { color: 'rgba(209, 209, 209, 0.87)' },
            '& .MuiInputLabel-root': { color: 'rgba(209, 209, 209, 0.87)' },
            '& .MuiInputLabel-root.Mui-focused': { color: 'rgba(209, 209, 209, 0.87)' }
        }}
      />
    <TextField
      value={password}
      id="outlined-basic"
      label="Password"
      variant="outlined"
      type="password"
      onChange={(e) => setPassword(e.target.value)}
      sx={{ 
        '& .MuiInputBase-root': { fontSize: '1rem' },
        '& .MuiInputBase-input': { color: 'rgba(209, 209, 209, 0.87)' },
        '& .MuiInputLabel-root': { color: 'rgba(209, 209, 209, 0.87)' },
        '& .MuiInputLabel-root.Mui-focused': { color: 'rgba(209, 209, 209, 0.87)' }
      }}
    />
      <Button
        disabled={deatilsNotFull || loading}
        variant="contained"
        onClick={handleLogin}
        sx={{ 
          backgroundColor: '#1976d2', 
          '&:hover': { backgroundColor: '#1565c0' },
          textTransform: 'none',
          fontSize: '1rem',
          '&:focus': { outline: 'none' },
          '&.Mui-disabled': { 
            color: 'rgba(209, 209, 209, 0.87)' 
          }
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
      <label style={{ color: "red" }}>{errorLabel}</label>
      <label>
        Don't have an account?{" "}
        <Link onClick={() => onSignUp(true)}>Sign Up!</Link>
      </label>
    </Stack>
  );
}
