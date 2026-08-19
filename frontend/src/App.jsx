import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import BottomNav from "./components/layout/BottomNav";

import ChatPage from "./pages/ChatPage";
import NewsPage from "./pages/NewsPage";
import AboutPage from "./pages/AboutPage";
import GuidancePage from "./pages/GuidancePage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function MainLayout({ children }) {
  return (
    <div className="flex h-screen flex-col bg-slate-950">
      <Navbar />

      <main className="min-h-0 flex-1">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Main app */}
        <Route
          path="/"
          element={
            <MainLayout>
              <ChatPage />
            </MainLayout>
          }
        />

        <Route
          path="/news"
          element={
            <MainLayout>
              <NewsPage />
            </MainLayout>
          }
        />

        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />

        <Route
          path="/guidance"
          element={
            <MainLayout>
              <GuidancePage />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}