import React from "react";
import Aside from "./Aside";
import Main from "./Main";
import { useState } from "react";

export default function NuevoPlatillo() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [id, setId] = useState("");

  return (
    <div id="nuevoPlatillo" className="min-h-100 bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Aside />
        <Main
          nombre={nombre}
          setNombre={setNombre}
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          precio={precio}
          setPrecio={setPrecio}
          id={id}
          setId={setId}
        />
      </div>
    </div>
  );
}
