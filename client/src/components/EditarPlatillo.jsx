import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import Main from "./Main";
import { obtenerplatillo } from "../helpers";

export default function EditarPlatillos() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    obtenerDatosPlatillo();
  }, []);

  async function obtenerDatosPlatillo() {
    const parametrosURL = new URLSearchParams(window.location.search);
    const idplatillo = parseInt(parametrosURL.get("id"));
    const platillo = await obtenerplatillo(idplatillo);
    mostrarPlatillo(platillo);
  }

  function mostrarPlatillo(platillo) {
    setNombre(platillo.nombre);
    setDescripcion(platillo.descripcion);
    setPrecio(platillo.precio);
    setId(platillo.id);
  }

  return (
    <div className="min-h-100 bg-gray-200">
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
