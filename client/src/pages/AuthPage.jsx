import { useState } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm/LoginForm";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import { isLoggedIn } from "../utils/auth";
import { useEffect } from "react";

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
      {!signUp ? (
        <LoginForm onSignUp={setSignUp} />
      ) : (
        <SignUpForm onSignUp={setSignUp} />
      )}
    </>
  );
}
