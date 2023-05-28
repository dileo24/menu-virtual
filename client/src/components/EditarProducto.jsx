import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import Main from "./Main";
import {
  obtenerProducto,
  ningunInputVacio,
  editarProducto,
  mostrarAlerta,
} from "../helpers";

export default function EditarProductos() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [id, setId] = useState("");

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

    // Agregar el evento de submit al formulario
    const formulario = document.querySelector("#formulario");
    formulario.addEventListener("submit", validarProducto);

    return () => {
      formulario.removeEventListener("submit", validarProducto);
    };
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
      editarProducto(producto);
      mostrarAlerta("Producto editado con éxito", "exito");
    } else {
      mostrarAlerta("Error: Hay algún campo vacío", "error");
      console.log(producto);
    }
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
          onSubmit={validarProducto}
        />
      </div>
    </div>
  );
}
