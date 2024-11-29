import React from "react";

export default function Events() {
  return (
    <div className="relative w-full min-h-screen bg-cover bg-center" style={{ backgroundColor: "#5D6D7C" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Título */}
      <div className="relative flex items-center justify-center py-16">
        <h1 className="text-yellow-500 text-6xl md:text-8xl font-bold">Eventos</h1>
      </div>
      <div className="relative flex flex-wrap justify-center gap-8 px-4 md:px-16 pb-16">
        {/* Tarjeta 1 */}
        <div className="rounded-lg shadow-lg overflow-hidden max-w-sm" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <img
            src="/path-to-image1.png"
            alt="Charlas"
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2 text-white">Charlas</h2>
            <p className="text-gray-300">
              Participa en nuestras charlas informativas sobre temas clave como
              ciberseguridad y tecnología.
            </p>
          </div>
        </div>
        {/* Tarjeta 2 */}
        <div className="rounded-lg shadow-lg overflow-hidden max-w-sm" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <img
            src="/path-to-image2.jpeg"
            alt="Búsqueda del Tesoro"
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2 text-white">Búsqueda del Tesoro</h2>
            <p className="text-gray-300">
              Únete a la emocionante búsqueda del tesoro y gana increíbles
              premios como una Nintendo Switch.
            </p>
          </div>
        </div>
        {/* Tarjeta 3 */}
        <div className="rounded-lg shadow-lg overflow-hidden max-w-sm" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <img
            src="/path-to-image3.jpg"
            alt="Hackatón"
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2 text-white">Hackatón</h2>
            <p className="text-gray-300">
              Demuestra tus habilidades en un hackatón lleno de retos
              interesantes y proyectos colaborativos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
