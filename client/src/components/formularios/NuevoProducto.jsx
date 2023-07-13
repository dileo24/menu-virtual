import React, { useState } from "react";
import FormProducto from "./FormProducto";
import { nuevoProducto, mostrarAlerta, ningunInputVacio } from "../../helpers";
import { useSelector } from "react-redux";

export default function NuevoProducto() {
  const titulo = "Nuevo Producto";
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaID, setCategoriaID] = useState("");
  const [subcategoriaID, setSubcategoriaID] = useState("");
  const [itemsExtra, setItemsExtra] = useState([]);
  const [numItemsExtra, setNumItemsExtra] = useState(0);
  const [cantidadPersonas, setCantidadPersonas] = useState("1");
  const [listado, setListado] = useState(true);
  const [mostrarPersonaItem, setMostrarPersonaItem] = useState(true);
  const [mostrarOtroCheckbox, setMostrarOtroCheckbox] = useState(false);
  const [mostrarPrecio, setMostrarPrecio] = useState(true);
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
      subcategoriaID,
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
      subcategoriaID={subcategoriaID}
      setSubcategoriaID={setSubcategoriaID}
      listado={listado}
      setListado={setListado}
      mostrarPersonaItem={mostrarPersonaItem}
      setMostrarPersonaItem={setMostrarPersonaItem}
      mostrarOtroCheckbox={mostrarOtroCheckbox}
      setMostrarOtroCheckbox={setMostrarOtroCheckbox}
      mostrarPrecio={mostrarPrecio}
      setMostrarPrecio={setMostrarPrecio}
      item={item}
      setItem={setItem}
    />
  );
}
