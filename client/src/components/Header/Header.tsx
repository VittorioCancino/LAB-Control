import React from "react";


export default function Header() {
  return (
    <header
  className="relative w-full h-screen bg-cover bg-center"
  style={{ backgroundImage: `url('/header_holder.jpg')` }} // Asegúrate de usar la ruta correcta de la imagen
>
  <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay para oscurecer la imagen */}
  <div className="relative flex items-center justify-center h-full">
    <h1 className="text-yellow-500 text-6xl md:text-8xl font-bold">
      Hello World
    </h1>
  </div>
</header>
  );
}
