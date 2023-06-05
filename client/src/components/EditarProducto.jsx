import React, { useEffect, useState } from "react";
import FormProducto from "./FormProducto";
import {
  obtenerProducto,
  ningunInputVacio,
  editarProducto,
  mostrarAlerta,
} from "../helpers";
import { useSelector } from "react-redux";

export default function EditarProductos() {
  const titulo = "Editar Producto";
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [id, setId] = useState("");
  const [categoriaID, setCategoriaID] = useState("");
  const [itemsExtra, setItemsExtra] = useState([]);
  const [numItemsExtra, setNumItemsExtra] = useState(0);
  const token = useSelector((state) => state.userActual.tokenSession);

  useEffect(() => {
    // Obtener el ID del producto de la URL cuando se carga la página
    const parametrosURL = new URLSearchParams(window.location.search);
    const idProducto = parseInt(parametrosURL.get("id"));

    obtenerProducto(idProducto)
      .then((producto) => {
        mostrarProducto(producto);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Mostrar los datos del producto en el formulario
  function mostrarProducto(producto) {
    // console.log(producto);
    setCategoriaID(producto.categoriaID);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setId(producto.id);
    setNumItemsExtra(producto.itemsExtra.length);
    setItemsExtra(producto.itemsExtra);
  }

  // Validar y actualizar el producto con los nuevos cambios
  function validarProducto(e) {
    e.preventDefault();

    const producto = {
      categoriaID,
      nombre,
      descripcion,
      precio,
      id: parseInt(id),
      itemsExtra,
    };

    if (ningunInputVacio(producto)) {
      editarProducto(producto, token);
      // console.log(producto);
      mostrarAlerta("Producto editado con éxito", "exito");
    } else {
      mostrarAlerta("Error: Hay algún campo vacío", "error");
    }
  }

  return (
    <FormProducto
      nombre={nombre}
      setNombre={setNombre}
      descripcion={descripcion}
      setDescripcion={setDescripcion}
      precio={precio}
      setPrecio={setPrecio}
      id={id}
      setId={setId}
      itemsExtra={itemsExtra}
      setItemsExtra={setItemsExtra}
      onSubmit={validarProducto}
      titulo={titulo}
      numItemsExtra={numItemsExtra}
      setNumItemsExtra={setNumItemsExtra}
      categoriaID={categoriaID}
      setCategoriaID={setCategoriaID}
    />
  );
}
