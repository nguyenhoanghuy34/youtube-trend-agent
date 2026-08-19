import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import BottomNav from "./components/layout/BottomNav";

import ChatPage from "./pages/ChatPage";
import NewsPage from "./pages/NewsPage";
import AboutPage from "./pages/AboutPage";
import GuidancePage from "./pages/GuidancePage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* Main application */}
        <Route
          path="/*"
          element={
            <div
              className={`flex h-screen flex-col ${
                theme === "dark" ? "bg-slate-950" : "bg-slate-50"
              }`}
            >
              <Navbar
                theme={theme}
                onThemeChange={setTheme}
              />

              <main className="min-h-0 flex-1">
                <Routes>
                  <Route
                    path="/"
                    element={<ChatPage theme={theme} />}
                  />

                  <Route
                    path="/news"
                    element={<NewsPage theme={theme} />}
                  />

                  <Route
                    path="/about"
                    element={<AboutPage theme={theme} />}
                  />

                  <Route
                    path="/guidance"
                    element={<GuidancePage theme={theme} />}
                  />
                </Routes>
              </main>

              <BottomNav theme={theme} />
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
