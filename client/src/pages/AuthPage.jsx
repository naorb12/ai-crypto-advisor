import { useState } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm/LoginForm";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import { isLoggedIn } from "../utils/auth";
import { useEffect } from "react";
import "./AuthPage.css";

export default function AuthPage() {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  useEffect(() => {
    if (isLoggedIn()) {
      console.log("logged in ");

      navigate("/dashboard");
    }
  });
  return (
    <>
      <h1>AI Crypto Advisor</h1>
      <div id="auth-page">
        {!signUp ? (
          <LoginForm onSignUp={setSignUp} />
        ) : (
          <SignUpForm onSignUp={setSignUp} />
        )}
      </div>
    </>
  );
}
