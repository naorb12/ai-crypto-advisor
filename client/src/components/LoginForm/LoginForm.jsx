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

  async function handleLogin() {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (response.status === 200) {
        const { token } = await response.json();
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userName", userName);
        navigate("/user-preferences");
      } else if (response.status === 401) {
        setErrorLabel("User or Password don't match");
      }
    } catch (err) {
      console.log("Couldn't sign in, ", err);
    }
  }
  return (
    <Stack id="sign-in-stack" spacing={1}>
      <h2>Please Login:</h2>
      <TextField
        value={email}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        value={password}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="success" onClick={handleLogin}>
        Login
      </Button>
      <label style={{ color: "red" }}>{errorLabel}</label>
      <label>
        Don't have an account?{" "}
        <Link onClick={() => onSignUp(true)}>Sign Up!</Link>
      </label>
    </Stack>
  );
}
