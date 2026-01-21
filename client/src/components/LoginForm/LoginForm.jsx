import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function LoginForm({ onSignUp }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLabel, setErrorLabel] = useState("");
  const [loading, setLoading] = useState(false);

  const deatilsNotFull = email === "" || password === "";

  async function handleLogin() {
    setLoading(true);
    setErrorLabel("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        },
      );
      if (response.status === 200) {
        const { token, name, onboardingCompleted } = await response.json();
        console.log(onboardingCompleted);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("onboardingCompleted", onboardingCompleted);
        if (!onboardingCompleted) {
          navigate("/user-preferences");
        } else {
          navigate("/dashboard");
        }
      } else if (response.status === 400) {
        setErrorLabel("Email doesn't exist in our systems.");
      } else if (response.status === 401) {
        setErrorLabel("Password incorrect.");
      } else {
        setErrorLabel("Error occured");
      }
    } catch (err) {
      console.log("Couldn't sign in, ", err);
      setErrorLabel("Connection error");
    } finally {
      setLoading(false);
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
        sx={{ '& .MuiInputBase-root': { fontSize: '1rem' } }}
      />
      <TextField
        value={password}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        sx={{ '& .MuiInputBase-root': { fontSize: '1rem' } }}
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
          '&:focus': { outline: 'none' }
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
