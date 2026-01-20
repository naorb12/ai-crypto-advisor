import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function SignUpForm({ onSignUp }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorLabel, setErrorLabel] = useState("");

  async function handleSignUp(params) {}
  return (
    <Stack id="sign-in-stack" spacing={1}>
      <h2>Please Sign In:</h2>
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
      <Button variant="contained" color="success" onClick={handleSignUp}>
        Sign Up
      </Button>
      <label style={{ color: "red" }}>{errorLabel}</label>
      <Link onClick={() => onSignUp(false)}>Login!</Link>
    </Stack>
  );
}
