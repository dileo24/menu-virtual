import React, { useEffect } from "react";
import Header from "./Header";
import StatsProductos from "../recursos/StatsProductos";
import StatsPedidos from "../recursos/StatsPedidos";

export default function Estadisticas() {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Header />
        <div className="modal flex flex-col justify-center h-screen bg-gray-200 md:w-4/5 xl:w-4/5">
          <div className="flex flex-col  items-center contenedor w-auto">
            <StatsPedidos />
            <StatsProductos />
          </div>
        </div>
      </div>
    </div>
  );
}
