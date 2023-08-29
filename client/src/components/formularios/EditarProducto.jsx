import React, { useEffect, useState } from "react";
import FormProducto from "./FormProducto";
import { obtenerProducto, obtenerItem, editarProducto } from "../../helpers";
import { useSelector } from "react-redux";
import Alerta from "../recursos/Alerta";

export default function EditarProductos({ prodID }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [id, setId] = useState("");
  const [categoriaID, setCategoriaID] = useState("");
  const [subcategoriaID, setSubcategoriaID] = useState("");
  const [itemsExtra, setItemsExtra] = useState([]);
  const [numItemsExtra, setNumItemsExtra] = useState(0);
  const [cantidadPersonas, setCantidadPersonas] = useState("1");
  const [listado, setListado] = useState(true);
  const [mostrarPersonaItem, setMostrarPersonaItem] = useState(false);
  const [mostrarOtroCheckbox, setMostrarOtroCheckbox] = useState(true);
  const [mostrarPrecio, setMostrarPrecio] = useState(true);
  const [item, setItem] = useState(false);
  const [crearProducto, setCrearProducto] = useState(false);
  const [combo, setCombo] = useState(false);
  const token = useSelector((state) => state.userActual.tokenSession);
  const [alertaError, setAlertaError] = useState(false);
  const [alertaExito, setAlertaExito] = useState(false);
  const vertical = window.innerHeight > window.innerWidth;
  const [imagen, setImagen] = useState("");
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

  useEffect(() => {
    // Obtener el ID del producto de la URL cuando se carga la página
    const parametrosURL = new URLSearchParams(window.location.search);
    const idProducto = parseInt(parametrosURL.get("id")) || prodID;
    // const idItem = parseInt(parametrosURL.get("idItem"));

    /* if (idItem) {
      obtenerItem(idItem)
        .then((item) => {
          if (item.item === true) {
            mostrarItem(item);
          }
        })
        .catch((error) => {
          console.log("error al obtener item" + error);
        });
    } else  */ if (idProducto) {
      obtenerProducto(idProducto)
        .then((producto) => {
          mostrarProducto(producto);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [prodID]);

  // Mostrar los datos del producto en el formulario
  function mostrarProducto(producto) {
    setCategoriaID(producto.categoriaID);
    setSubcategoriaID(producto.subcategoriaID);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setId(producto.id);
    setNumItemsExtra(producto.itemsExtra && producto.itemsExtra.length);
    setItemsExtra(producto.itemsExtra);
    setCantidadPersonas(producto.cantidadPersonas);
    setMostrarPersonaItem(producto.mostrarPersonaItem);
    setMostrarOtroCheckbox(producto.mostrarOtroCheckbox);
    setListado(producto.listado);
    setCombo(producto.combo);
    setCrearProducto(producto.combo ? false : true);
    setImagen(producto.imagen);
  }

  // Mostrar los datos del item en el formulario
  function mostrarItem(item) {
    setCategoriaID(item.categoriaID);
    setSubcategoriaID(item.subcategoriaID);
    setNombre(item.nombre);
    setDescripcion(item.descripcion);
    setPrecio(item.precio);
    setId(item.id);
    setCantidadPersonas(item.cantidadPersonas);
    setMostrarPersonaItem(item.mostrarPersonaItem);
    setMostrarOtroCheckbox(item.mostrarOtroCheckbox);
    setListado(item.listado);
    setItem(item.item);
    setCombo(item.combo);
    setCrearProducto(item.combo ? false : true);
  }

  // Validar y actualizar el producto con los nuevos cambios
  function validarProducto(e) {
    e.preventDefault();

    if (itemsExtra && checkForEmptyElements(itemsExtra)) {
      return setAlertaError({
        estadoActualizado: true,
        texto: `Falta seleccionar la categoría de algún ítem extra`,
      });
    }

    const producto = {
      categoriaID,
      subcategoriaID,
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
      combo,
      imagen,
    };

    setAlertaExito({
      estado: true,
      texto: combo
        ? "Combo actualizado con éxito"
        : "Producto actualizado con éxito",
      producto,
    });
  }

  return (
    <>
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
        subcategoriaID={subcategoriaID}
        setSubcategoriaID={setSubcategoriaID}
        listado={listado}
        setListado={setListado}
        mostrarPersonaItem={mostrarPersonaItem}
        setMostrarPersonaItem={setMostrarPersonaItem}
        mostrarOtroCheckbox={mostrarOtroCheckbox}
        setMostrarOtroCheckbox={setMostrarOtroCheckbox}
        item={item}
        setItem={setItem}
        mostrarPrecio={mostrarPrecio}
        setMostrarPrecio={setMostrarPrecio}
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
          callback={() => editarProducto(alertaExito.producto, token)}
        />
      )}
    </>
  );
}
