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
  const [mostrarPersonaItem, setMostrarPersonaItem] = useState(false);
  const [mostrarOtroCheckbox, setMostrarOtroCheckbox] = useState(true);
  const [item, setItem] = useState(false);
  // const [checkListadoTrue, setCheckListadoTrue] = useState("");
  // const [checkListadoFalse, setCheckListadoFalse] = useState("");
  const token = useSelector((state) => state.userActual.tokenSession);

  useEffect(() => {
    // Obtener el ID del producto de la URL cuando se carga la página
    const parametrosURL = new URLSearchParams(window.location.search);
    const idProducto = parseInt(parametrosURL.get("id"));
    const idItem = parseInt(parametrosURL.get("idItem"));

    if (idItem) {
      console.log("Es un ítem");
      obtenerItem(idItem)
        .then((item) => {
          mostrarItem(item);
        })
        .catch((error) => {
          console.log("error al obtener item" + error);
        });
    } else if (idProducto) {
      console.log("Es un producto");
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
    setCategoriaID(producto.categoriaID);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setId(producto.id);
    setNumItemsExtra(producto.itemsExtra.length);
    setItemsExtra(producto.itemsExtra);
    setCantidadPersonas(producto.cantidadPersonas);
  }

  // Mostrar los datos del item en el formulario
  function mostrarItem(item) {
    console.log(item);
    setCategoriaID(item.categoriaID);
    setNombre(item.nombre);
    setDescripcion(item.descripcion);
    setPrecio(item.precio);
    setId(item.id);
    setCantidadPersonas(item.cantidadPersonas);
    setMostrarPersonaItem(item.mostrarPersonaItem);
    setMostrarOtroCheckbox(item.mostrarOtroCheckbox);
    setListado(item.listado);
    // setCheckListadoFalse(item.listado === false ? true : false);
    // setCheckListadoTrue(item.listado === true ? true : false);
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
      mostrarPersonaItem,
      mostrarOtroCheckbox,
      item,
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
      mostrarPersonaItem={mostrarPersonaItem}
      setMostrarPersonaItem={setMostrarPersonaItem}
      mostrarOtroCheckbox={mostrarOtroCheckbox}
      setMostrarOtroCheckbox={setMostrarOtroCheckbox}
      item={item}
      setItem={setItem}
      // checkListadoTrue={checkListadoTrue}
      // setCheckListadoTrue={setCheckListadoTrue}
      // checkListadoFalse={checkListadoFalse}
      // setCheckListadoFalse={setCheckListadoFalse}
    />
  );
}
