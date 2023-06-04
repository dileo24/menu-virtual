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
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setId(producto.id);
  }

  // Validar y actualizar el producto con los nuevos cambios
  function validarProducto(e) {
    e.preventDefault();

    const producto = {
      nombre,
      descripcion,
      precio,
      id: parseInt(id),
    };

    if (ningunInputVacio(producto)) {
      editarProducto(producto, token);
      mostrarAlerta("Producto editado con éxito", "exito");
    } else {
      mostrarAlerta("Error: Hay algún campo vacío", "error");
      console.log(producto);
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
      onSubmit={validarProducto}
      titulo={titulo}
    />
  );
}
