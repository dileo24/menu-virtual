import React, { useEffect, useState } from "react";
import FormProducto from "./FormProducto";
import {
  obtenerProducto,
  obtenerItem,
  ningunInputVacio,
  editarProducto,
  mostrarAlerta,
} from "../../helpers";
import { useSelector } from "react-redux";

export default function EditarProductos() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [id, setId] = useState("");
  const [categoriaID, setCategoriaID] = useState("");
  const [itemsExtra, setItemsExtra] = useState([]);
  const [numItemsExtra, setNumItemsExtra] = useState(0);
  const [cantidadPersonas, setCantidadPersonas] = useState("1");
  const [listado, setListado] = useState(true);
  const [mostrarPersonasItems, setmostrarPersonasItems] = useState(true);
  const [mostrarOtroCheckbox, setMostrarOtroCheckbox] = useState(false);
  const token = useSelector((state) => state.userActual.tokenSession);

  useEffect(() => {
    // Obtener el ID del producto de la URL cuando se carga la página
    const parametrosURL = new URLSearchParams(window.location.search);
    const idProducto = parseInt(parametrosURL.get("id"));
    const idItem = parseInt(parametrosURL.get("idItem"));

    if (idItem) {
      obtenerItem(idItem)
        .then((item) => {
          mostrarProducto(item);
        })
        .catch((error) => {
          console.log("error al obtener item" + error);
        });
    } else if (idProducto) {
      obtenerProducto(idProducto)
        .then((producto) => {
          mostrarProducto(producto);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // Mostrar los datos del producto en el formulario
  function mostrarProducto(producto) {
    // console.log(producto);
    if (producto.categoriaID) {
      setCategoriaID(producto.categoriaID);
    }
    if (producto.categoriaItem) {
      setCategoriaID(producto.categoriaItem.id);
    }
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    // setId(producto.id);
    setNumItemsExtra(producto.itemsExtra.length);
    setItemsExtra(producto.itemsExtra);
    setCantidadPersonas(producto.cantidadPersonas);
    if (producto.mostrarPersonasItems) {
      setmostrarPersonasItems(producto.mostrarPersonasItems);
      setMostrarOtroCheckbox(producto.mostrarOtroCheckbox);
      setListado(producto.listado);
    }
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
      cantidadPersonas,
      listado,
    };

    if (!ningunInputVacio(producto) || itemsExtra.some((item) => item === "")) {
      return mostrarAlerta("Error: Hay algún campo vacío", "error");
    }
    if (nombre === " - Personalizable") {
      return mostrarAlerta("Error: El nombre está incompleto", "error");
    }
    editarProducto(producto, token);
    console.log(producto);
    mostrarAlerta("Producto editado con éxito", "exito");
  }

  return (
    <FormProducto
      nombre={nombre}
      setNombre={setNombre}
      cantidadPersonas={cantidadPersonas}
      setCantidadPersonas={setCantidadPersonas}
      descripcion={descripcion}
      setDescripcion={setDescripcion}
      precio={precio}
      setPrecio={setPrecio}
      id={id}
      setId={setId}
      itemsExtra={itemsExtra}
      setItemsExtra={setItemsExtra}
      onSubmit={validarProducto}
      numItemsExtra={numItemsExtra}
      setNumItemsExtra={setNumItemsExtra}
      categoriaID={categoriaID}
      setCategoriaID={setCategoriaID}
      listado={listado}
      setListado={setListado}
      mostrarPersonasItems={mostrarPersonasItems}
      setmostrarPersonasItems={setmostrarPersonasItems}
      mostrarOtroCheckbox={mostrarOtroCheckbox}
      setMostrarOtroCheckbox={setMostrarOtroCheckbox}
    />
  );
}
