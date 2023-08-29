import React, { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
import {
  nuevoProducto /* , mostrarAlerta, ningunInputVacio */,
} from "../../helpers";
import { useSelector } from "react-redux";
import Alerta from "../recursos/Alerta";

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
  const [crearProducto, setCrearProducto] = useState(false);
  const [combo, setCombo] = useState(false);
  const token = useSelector((state) => state.userActual.tokenSession);
  const [alertaError, setAlertaError] = useState(false);
  const [alertaExito, setAlertaExito] = useState(false);
  const vertical = window.innerHeight > window.innerWidth;
  const [imagen, setImagen] = useState(null);
  const [imageError, setImageError] = useState("");

  const handleImageUrlChange = (event) => {
    const url = event.target.value;
    setImagen(url);
    setImageError("");
  };

  const handleImageLoadError = () => {
    setImageError("No se pudo cargar la imagen desde la URL proporcionada.");
  };

  const checkForEmptyElements = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "") {
        return true; // Si se encuentra un elemento vacío, se devuelve true
      }
    }
    return false; // Si no se encuentra ningún elemento vacío, se devuelve false
  };

  function validarProducto(e) {
    e.preventDefault();

    if (checkForEmptyElements(itemsExtra)) {
      return setAlertaError({
        estadoActualizado: true,
        texto: `Falta seleccionar la categoría de algún ítem extra`,
      });
    }

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
      combo,
      imagen,
    };

    console.log(producto);

    setAlertaExito({
      estado: true,
      texto: combo ? "Combo creado con éxito" : "Producto creado con éxito",
      producto,
    });

    // Reiniciar los campos del formulario
    /* setCategoriaID("");
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setItemsExtra([]);
    setNumItemsExtra(0); */
  }

  return (
    <>
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
        crearProducto={crearProducto}
        setCrearProducto={setCrearProducto}
        combo={combo}
        setCombo={setCombo}
        vertical={vertical}
        imagen={imagen}
        handleImageUrlChange={handleImageUrlChange}
        handleImageLoadError={handleImageLoadError}
        imageError={imageError}
      />
      {alertaError && (
        <Alerta
          tipo={"error"}
          titulo={"Error"}
          texto={alertaError.texto}
          estado={alertaError}
          setEstado={setAlertaError}
          callback={() => {}}
        />
      )}
      {alertaExito && (
        <Alerta
          tipo={"exito"}
          titulo={"Éxito"}
          texto={alertaExito.texto}
          estado={alertaExito}
          setEstado={setAlertaExito}
          callback={() => nuevoProducto(alertaExito.producto, token)}
        />
      )}
    </>
  );
}
