import React from "react";
import Aside from "./Aside";

export default function Pedidos() {
  return (
    <div className="min-h-100 bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Aside />
        <h2 className="text-3xl font-light text-center">Planilla de pedidos</h2>
      </div>
    </div>
  );
}
