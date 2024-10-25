import React from "react";

export default function Navbar() {
    return (
        <>
          <div
            className={`fixed top-0 left-0 z-20 w-full`}
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