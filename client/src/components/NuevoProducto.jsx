import React, { useState } from "react";
import Aside from "./Aside";
import Main from "./Main";
import { nuevoProducto, mostrarAlerta, ningunInputVacio } from "../helpers";
import { useSelector } from "react-redux";

export default function NuevoProducto() {
  const titulo = "Nuevo Producto";
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const token = useSelector((state) => state.userActual.tokenSession);

  function validarProducto(e) {
    e.preventDefault();

    const producto = {
      nombre,
      descripcion,
      precio,
    };

    if (!ningunInputVacio(producto)) {
      return mostrarAlerta("Error: Hay algún campo vacío", "error");
    }
    nuevoProducto(producto, token);
    mostrarAlerta("Producto agregado con éxito", "exito");

    // Reiniciar los campos del formulario
    setNombre("");
    setDescripcion("");
    setPrecio("");
  }

  return (
    <div id="nuevoProducto" className="min-h-100 bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Aside />
        <Main
          nombre={nombre}
          setNombre={setNombre}
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          precio={precio}
          setPrecio={setPrecio}
          onSubmit={validarProducto}
          titulo={titulo}
        />
      </div>
    </div>
  );
}
