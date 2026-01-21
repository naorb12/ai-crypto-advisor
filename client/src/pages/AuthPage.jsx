import { useState } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import SignUpForm from "../components/SignUpForm/SignUpForm";

export default function AuthPage() {
  const [signUp, setSignUp] = useState(false);
  // TODO: If loggedin -> redirect to dashboard
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
