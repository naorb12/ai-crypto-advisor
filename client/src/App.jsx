import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import UserPreferencesPage from "./pages/UserPreferencesPage";
import Header from "./components/Header/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/user-preferences" element={<UserPreferencesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
