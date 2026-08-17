import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import BottomNav from "./components/layout/BottomNav";

import Home from "./pages/Home";
import News from "./pages/News";
import AboutUs from "./pages/AboutUs";
import Guidance from "./pages/Guidance";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen flex-col bg-slate-50">

        <main className="min-h-0 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/guidance" element={<Guidance />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}