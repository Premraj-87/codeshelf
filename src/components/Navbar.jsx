import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  const links = [
    { path: "/", label: "Home" },
    { path: "/notes", label: "Notes" },
    { path: "/snippets", label: "Snippets" },
    { path: "/resources", label: "Resources" },
    { path: "/admin-login", label: "Admin" },
  ];

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        CodeShelf
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`hover:text-blue-400 ${
              location.pathname === link.path ? "text-blue-400 font-bold" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
        <button
  onClick={toggleTheme}
  className="ml-4 border p-1 rounded hover:bg-gray-700"
>
  {darkMode ? "🌙 Dark" : "☀️ Light"}
</button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <span className="material-icons">menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-gray-800 p-4 flex flex-col space-y-2 md:hidden rounded shadow-lg">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-blue-400 ${
                location.pathname === link.path ? "text-blue-400 font-bold" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
