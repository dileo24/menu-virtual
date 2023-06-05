import React, { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
import { nuevoProducto, mostrarAlerta, ningunInputVacio } from "../../helpers";
import { useSelector } from "react-redux";

export default function NuevoProducto() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaID, setCategoriaID] = useState("");
  const [itemsExtra, setItemsExtra] = useState([]);
  const [numItemsExtra, setNumItemsExtra] = useState(0);

  const token = useSelector((state) => state.userActual.tokenSession);

  function validarProducto(e) {
    e.preventDefault();

    const producto = {
      nombre,
      descripcion,
      precio,
      itemsExtra,
      categoriaID,
    };

    if (!ningunInputVacio(producto) || itemsExtra.some((item) => item === "")) {
      return mostrarAlerta("Error: Hay algún campo vacío", "error");
    }
    if (nombre === " - Personalizable") {
      return mostrarAlerta("Error: El nombre está incompleto", "error");
    }
    nuevoProducto(producto, token);
    console.log(producto);
    mostrarAlerta("Producto agregado con éxito", "exito");

    // Reiniciar los campos del formulario
    setCategoriaID("");
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setItemsExtra([]);
    setNumItemsExtra(0);
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
      itemsExtra={itemsExtra}
      setItemsExtra={setItemsExtra}
      onSubmit={validarProducto}
      numItemsExtra={numItemsExtra}
      setNumItemsExtra={setNumItemsExtra}
      categoriaID={categoriaID}
      setCategoriaID={setCategoriaID}
    />
  );
}
