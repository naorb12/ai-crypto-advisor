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
  const [loading, setLoading] = useState(false);

  const deatilsNotFull = email === "" || name === "" || password === "";

  // TODO: make it login as well!
  async function handleSignUp() {
    setLoading(true);
    setErrorLabel("");
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
    } catch (err) {
      setErrorLabel("Connection error");
    } finally {
      setLoading(false);
    }
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
        sx={{ 
          '& .MuiInputBase-root': { fontSize: '1rem' },
          '& .MuiInputLabel-root': { color: 'rgba(209, 209, 209, 0.87)' },
          '& .MuiInputLabel-root.Mui-focused': { color: 'rgba(209, 209, 209, 0.87)' }
        }}
      />
      <TextField
        value={name}
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
        sx={{ 
          '& .MuiInputBase-root': { fontSize: '1rem' },
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
          '& .MuiInputLabel-root': { color: 'rgba(209, 209, 209, 0.87)' },
          '& .MuiInputLabel-root.Mui-focused': { color: 'rgba(209, 209, 209, 0.87)' }
        }}
      />
      <Button
        disabled={deatilsNotFull || loading}
        variant="contained"
        onClick={handleSignUp}
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
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
      <label style={{ color: "red" }}>{errorLabel}</label>
      <Link onClick={() => onSignUp(false)}>Login!</Link>
    </Stack>
  );
}
