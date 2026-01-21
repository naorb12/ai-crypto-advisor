import { useNavigate } from "react-router";
import { isLoggedIn } from "../../utils/auth";
import Link from "@mui/material/Link";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  function handleLogout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("onboardingCompleted");
    navigate("/");
  }
  return (
    <>
      {isLoggedIn() && (
        <label className="header-label">
          Hello {sessionStorage.getItem("name")}
          {"! "}
          <Link onClick={handleLogout}>Logout</Link>
        </label>
      )}
    </>
  );
}
