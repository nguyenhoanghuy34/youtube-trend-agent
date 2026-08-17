import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import BottomNav from "./components/layout/BottomNav";

import ChatPage from "./pages/ChatPage";
import NewsPage from "./pages/NewsPage";
import AboutPage from "./pages/AboutPage";
import GuidancePage from "./pages/GuidancePage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen flex-col bg-slate-50">

        {/* Always visible */}
        <Navbar />

        {/* Only this area changes */}
        <main className="min-h-0 flex-1">
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/guidance" element={<GuidancePage />} />
          </Routes>
        </main>

        {/* Always visible */}
        <BottomNav />

      </div>
    </BrowserRouter>
  );
}