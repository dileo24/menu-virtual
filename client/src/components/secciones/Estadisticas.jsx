import React, { useEffect } from "react";
import Aside from "./Aside";
import Stats from "../recursos/stats";

export default function Estadisticas() {
  useEffect(() => {
    // Cambiarle el background del botón del Aside
    const estadisticas = document.querySelector(".estadisticas");
    estadisticas.classList.add("bg-teal-700");
  }, []);
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Aside />
        <div className="modal flex flex-col justify-center h-screen bg-gray-200 md:w-4/5 xl:w-4/5">
          <div className="flex flex-col  items-center contenedor w-auto">
            <Stats />
          </div>
        </div>
      </div>
    </div>
  );
}
