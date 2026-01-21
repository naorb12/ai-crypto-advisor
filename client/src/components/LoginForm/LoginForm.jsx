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

  const deatilsNotFull = email === "" || password === "";

  async function handleLogin() {
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
        const { token, onboardingCompleted } = await response.json();
        console.log(onboardingCompleted);
        sessionStorage.setItem("token", token);
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
      <Button
        disabled={deatilsNotFull}
        variant="contained"
        color="success"
        onClick={handleLogin}
      >
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
