import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import BottomNav from "./components/layout/BottomNav";

import ChatPage from "./pages/ChatPage";
import NewsPage from "./pages/NewsPage";
import AboutPage from "./pages/AboutPage";
import GuidancePage from "./pages/GuidancePage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  const [authUser, setAuthUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    function handleStorageChange() {
      const savedUser = localStorage.getItem("user");
      setAuthUser(savedUser ? JSON.parse(savedUser) : null);
    }

    function handleAuthChange() {
      handleStorageChange();
    }

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authchange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authchange", handleAuthChange);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    setAuthUser(null);
    window.dispatchEvent(new Event("authchange"));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" replace /> : <LoginPage />}
        />

        <Route
          path="/register"
          element={authUser ? <Navigate to="/" replace /> : <RegisterPage />}
        />

        <Route
          path="/*"
          element={
            authUser ? (
            <div
              className={`flex h-screen flex-col ${
                theme === "dark" ? "bg-slate-950" : "bg-slate-50"
              }`}
            >
              <Navbar
                theme={theme}
                onThemeChange={setTheme}
                onLogout={handleLogout}
              />

              <main className="min-h-0 flex-1">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ChatPage
                        key={authUser.id}
                        theme={theme}
                        authUser={authUser}
                      />
                    }
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
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
