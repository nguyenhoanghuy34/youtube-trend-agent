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

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
            YTA
          </div>

          <span className="text-lg font-bold tracking-tight text-slate-900">
            Youtube Trending Agent
          </span>
        </NavLink>

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
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

      </div>
    </header>
  );
}