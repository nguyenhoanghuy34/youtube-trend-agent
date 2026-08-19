import { useEffect, useRef, useState } from "react";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Chat with Agent",
    path: "/",
  },
  {
    label: "News",
    path: "/news",
  },
  {
    label: "About Us",
    path: "/about",
  },
  {
    label: "Guidance",
    path: "/guidance",
  },
];

export default function Navbar({ theme, onThemeChange, onLogout }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleThemeChange(newTheme) {
    onThemeChange(newTheme);
    setOpen(false);
  }

  return (
    <header
      className={`border-b ${
        theme === "dark"
          ? "border-slate-800 bg-slate-950"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-6">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
            YTA
          </div>

          <span className={`text-lg font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Youtube Trending Agent
          </span>
        </NavLink>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : theme === "dark"
                        ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Avatar */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                theme === "dark"
                  ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              aria-label="Open user menu"
            >
              <User size={18} />
            </button>

            {/* Dropdown */}
            {open && (
              <div className={`absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border shadow-lg ${theme === "dark" ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}>

                {/* Theme */}
                <div className="p-2">

                  <p
                    className={`px-3 py-2 text-xs font-medium ${
                      theme === "dark"
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    Theme
                  </p>

                  <button
                    onClick={() => handleThemeChange("light")}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                      theme === "light"
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <Sun size={16} />
                    Light
                  </button>

                  <button
                    onClick={() => handleThemeChange("dark")}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                      theme === "dark"
                        ? "bg-slate-800 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Moon size={16} />
                    Dark
                  </button>
                </div>

                {/* Divider */}
                <div
                  className={`border-t ${
                    theme === "dark"
                      ? "border-slate-800"
                      : "border-slate-200"
                  }`}
                />

                {/* Logout */}
                <div className="p-2">
                  <button
                    onClick={() => {
                      onLogout?.();
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                      theme === "dark"
                        ? "text-slate-400"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
