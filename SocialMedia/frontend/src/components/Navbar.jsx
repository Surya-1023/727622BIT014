import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="flex gap-6 text-lg">
        <Link to="/top-users" className="hover:text-yellow-400 transition">Top Users</Link>
        <Link to="/trending-posts" className="hover:text-yellow-400 transition">Trending Posts</Link>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 bg-yellow-400 text-black rounded-full font-medium hover:bg-yellow-300 transition"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;