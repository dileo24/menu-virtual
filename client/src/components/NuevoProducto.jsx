import React, { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
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

  useEffect(() => {
    // Cambiarle el background del botón del Aside
    const nuevoProducto = document.querySelector(".nuevoProducto");
    nuevoProducto.classList.add("bg-teal-700");
  }, []);

  return (
    <FormProducto
      nombre={nombre}
      setNombre={setNombre}
      descripcion={descripcion}
      setDescripcion={setDescripcion}
      precio={precio}
      setPrecio={setPrecio}
      onSubmit={validarProducto}
      titulo={titulo}
    />
  );
}
