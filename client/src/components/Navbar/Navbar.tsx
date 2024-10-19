import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [isTop, setIsTop] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      const handleScroll = () => {
        setIsTop(window.scrollY < 10);
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY, location.pathname]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-20 w-full ${
          isTop && location.pathname === "/"
            ? "bg-transparent"
            : "bg-gray-100 shadow-md"
        } ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } transition-all duration-300`}
      >
        <nav className="flex items-center justify-between px-10 py-6">
          <div className="absolute left-0 px-4">
            <a href="/">
              <img src="/logo_holder.png" alt="Logo" className="h-20 w-auto" />{" "}
            </a>
          </div>

          <div className="flex items-center flex-grow mx-auto max-w-6xl">
            <input
              type="text"
              placeholder="Busca un curso..."
              className="flex-grow px-4 py-2 border-2 border-blue-900 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
        </nav>
      </div>
    </>
  );
}
