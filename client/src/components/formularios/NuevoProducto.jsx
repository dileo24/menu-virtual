import React, { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
import { nuevoProducto, mostrarAlerta, ningunInputVacio } from "../../helpers";
import { useSelector } from "react-redux";

export default function NuevoProducto() {
  const titulo = "Nuevo Producto";
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaID, setCategoriaID] = useState("");
  const [itemsExtra, setItemsExtra] = useState([]);
  const [numItemsExtra, setNumItemsExtra] = useState(0);
  const [cantidadPersonas, setCantidadPersonas] = useState("1");
  const [listado, setListado] = useState(true);
  const [mostrarPersonaItem, setMostrarPersonaItem] = useState(true);
  const [mostrarOtroCheckbox, setMostrarOtroCheckbox] = useState(false);
  const [item, setItem] = useState(false);
  const token = useSelector((state) => state.userActual.tokenSession);

  function validarProducto(e) {
    e.preventDefault();

    const producto = {
      nombre,
      item,
      descripcion,
      precio,
      itemsExtra,
      categoriaID,
      cantidadPersonas,
      listado,
      mostrarPersonaItem,
      mostrarOtroCheckbox,
    };

    if (!ningunInputVacio(producto) || itemsExtra.some((item) => item === "")) {
      return mostrarAlerta("Error: Hay algún campo vacío", "error");
    }
    nuevoProducto(producto, token);
    mostrarAlerta("Producto agregado con éxito", "exito");

    // Reiniciar los campos del formulario
    setCategoriaID("");
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setItemsExtra([]);
    setNumItemsExtra(0);
  }
  console.log("mostrarOtroCheckbox: " + mostrarOtroCheckbox);
  console.log("mostrarPersonaItem: " + mostrarPersonaItem);
  console.log("listado: " + listado);
  useEffect(() => {
    // Cambiarle el background del botón del Header
    const nuevoProducto = document.querySelector(".nuevoProducto");
    nuevoProducto.classList.add("bg-teal-700");
  }, []);

  return (
    <FormProducto
      titulo={titulo}
      nombre={nombre}
      cantidadPersonas={cantidadPersonas}
      setCantidadPersonas={setCantidadPersonas}
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
      listado={listado}
      setListado={setListado}
      mostrarPersonaItem={mostrarPersonaItem}
      setMostrarPersonaItem={setMostrarPersonaItem}
      mostrarOtroCheckbox={mostrarOtroCheckbox}
      setMostrarOtroCheckbox={setMostrarOtroCheckbox}
      item={item}
      setItem={setItem}
    />
  );
}
