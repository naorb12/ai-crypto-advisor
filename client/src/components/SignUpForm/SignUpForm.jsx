import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function SignUpForm({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorLabel, setErrorLabel] = useState("");

  const deatilsNotFull = email === "" || name === "" || password === "";

  async function handleSignUp() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            name: name,
            password: password,
          }),
        },
      );
      if (response.ok) {
        onSignUp(false);
      } else if (response.status === 409) {
        setErrorLabel("User with this email already exists.");
      } else if (response.status === 400) {
        setErrorLabel("User details are missing");
      } else {
        setErrorLabel("Error occured");
      }
    } catch (err) {}
  }
  return (
    <Stack id="auth-stack" spacing={1}>
      <h2>Please Sign Up:</h2>
      <TextField
        value={email}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        value={name}
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
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
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
      <label style={{ color: "red" }}>{errorLabel}</label>
      <Link onClick={() => onSignUp(false)}>Login!</Link>
    </Stack>
  );
}
