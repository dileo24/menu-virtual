import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../recursos/Header";
import Menu from "./Menu";
// import HacerPedido from "./HacerPedido1";
import MiPedido from "./MiPedido";
import Historial from "./Historial";
import ItemsCliente from "./ItemsCliente";
import UpdateItemsCliente from "./UpdateItemsCliente";
import { getProductos, deleteProducto } from "../../redux/actions";
import Swipe from "react-swipe";
import { Link } from "react-router-dom";
// import { io } from "socket.io-client";
import Alerta from "../recursos/Alerta";
import NuevoProducto from "../formularios/NuevoProducto";
import EditarProducto from "../formularios/EditarProducto";

const Carrusel = () => {
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [socket, setSocket] = useState(null);
  // const [diapositiva, setDiapositiva] = useState(0);
  // const prevDiapositivaRef = useRef(diapositiva);
  const carruselRef = useRef(null); // Referencia al contenedor principal
  const [preciosArray, setPreciosArray] = useState([]);
  const carrito = useSelector((state) => state.carrito);
  const userActual = useSelector((state) => state.userActual);
  const [alertaPregunta, setAlertaPregunta] = useState(false);
  let marginTop = carrito.length > 0 ? "" : "margen";
  let precioFinal = 0;
  const token = userActual && userActual.tokenSession;
  let productosState = useSelector((state) => state.home);
  const [alertaError, setAlertaError] = useState(false);
  const [busqueda, setBusqueda] = useState(false);
  const [checkAlertaError, setCheckAlertaError] = useState(false);
  const [miPedido, setMiPedido] = useState(false);
  const [historial, setHistorial] = useState(true);
  const [itemProd, setItemProd] = useState(false);
  const [editarItemProd, setEditarItemProd] = useState(false);
  const [prodID, setProdID] = useState(null);
  const [indexProd, setIndexProd] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState(true);
  const [editarProducto, setEditarProducto] = useState(false);
  const [editando, setEditando] = useState(false);

  const vertical = window.innerHeight > window.innerWidth;

  for (let i = 0; i < preciosArray.length; i++) {
    precioFinal += parseInt(preciosArray[i]);
  }
  const dispatch = useDispatch();
  // const [socket, setSocket] = useState(null);

  const { categorias, home, homeBusqueda /* , carrito */ } = useSelector(
    (state) => ({
      categorias: state.categorias,
      home: state.home,
      homeBusqueda: state.homeBusqueda,
      /* carrito: state.carrito, */
    })
  );

  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  const handleClickEliminar = (id) => {
    const producto = productosState.find((prod) => prod.id === id);
    const nombre = producto ? producto.nombre : "";
    setAlertaPregunta({
      estadoActualizado: true,
      id,
      nombre,
    });
  };

  const handleEliminarProducto = (id) => {
    dispatch(deleteProducto(id, token)).then(() => {
      dispatch(getProductos());
    });
  };

  const handleWindowScroll = useCallback(() => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const subHeader = document.getElementById("subHeader");
    const nav = document.getElementById("nav");
    const categoriasEl = document.getElementById("categorias");
    const subCategoriasEl = document.querySelector(".subCategorias");
    const marca = document.getElementById("marca");

    if (marca) {
      if (scrollPosition >= 110) {
        if (subCategoriasEl) {
          marca.style.marginBottom = "20vh";
        } else {
          marca.style.marginBottom = "30vw";
        }
        subHeader.style.position = "fixed";
        subHeader.style.top = "0";
        if (scrollPosition > prevScrollPosition) {
          if (nav.style.visibility !== "hidden") {
            nav.style.visibility = "hidden";
            categoriasEl.style.position = "relative";
            categoriasEl.style.top = "-15vw";
          }
        } else {
          if (nav.style.visibility === "hidden") {
            nav.style.visibility = "visible";
            categoriasEl.style.position = "static";
            categoriasEl.style.top = "";
          }
        }
      } else {
        marca.style.marginBottom = "";
        subHeader.style.position = "static";
        subHeader.style.top = "";
        nav.style.visibility = "visible";
        categoriasEl.style.position = "static";
        categoriasEl.style.top = "";
      }
    }

    setPrevScrollPosition(scrollPosition);
  }, [prevScrollPosition]);

  useEffect(() => {
    !busqueda &&
      vertical &&
      window.addEventListener("scroll", handleWindowScroll);
    if (busqueda && !userActual) {
      const marca = document.getElementById("marca");
      const subHeader = document.getElementById("subHeader");
      const nav = document.getElementById("nav");
      marca.style.marginBottom = "";
      subHeader.style.position = "static";
      subHeader.style.top = "";
      nav.style.visibility = "visible";
    }

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [handleWindowScroll, busqueda]);

  const handleSwipe = useCallback((index) => {
    setCurrentSlide(index);
    window.scrollTo({ top: 0 });

    setBusqueda(false);
  }, []);

  useEffect(() => {
    const precios = carrito.map((carritoItem) => carritoItem.precio);
    setPreciosArray(precios);
  }, [carrito]);

  useEffect(() => {
    const diapo = document.querySelector(
      `.scrollable-content[data-index="${currentSlide}"]`
    );
    if (diapo) {
      const menuContainer = diapo.querySelector("#menuContainer");
      const menuContainerHeight = menuContainer.offsetHeight;
      const swipe = document.querySelector(".swipe");
      swipe.style.maxHeight = `${menuContainerHeight}px`;
    }
  }, [currentSlide, checkAlertaError]);

  useEffect(() => {
    checkAlertaError && homeBusqueda && homeBusqueda.length === 0
      ? setAlertaError({
          estadoActualizado: true,
          texto: `No se encontraron resultados para la búsqueda "${busqueda}"`,
        })
      : setCheckAlertaError(false);
  }, [checkAlertaError]);

  useEffect(() => {
    preciosArray.length && setMiPedido(true);
    preciosArray.length && setHistorial(false);
  }, [preciosArray]);

  useEffect(() => {
    indexProd && console.log(indexProd);
  }, [editarItemProd]);

  const handleEditar = () => {
    if (editando) {
      setEditarProducto(true);
      setNuevoProducto(false);
    }
  };
  return (
    <div className="containerCarrusel">
      <Header
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        setBusqueda={setBusqueda}
        busqueda={busqueda}
        setCheckAlertaError={setCheckAlertaError}
      />
      <div
        id="carruselContainer"
        className={vertical ? "carruselMobile" : "carruselPC"}
      >
        <div className="carrusel-wrapper" ref={carruselRef}>
          {/* Clientes y usuarios */}
          {categorias.length && (
            <Swipe
              className="swipe"
              swipeOptions={{
                startSlide: currentSlide,
                speed: 300,
                continuous: false,
                callback: handleSwipe,
              }}
            >
              <div className="scrollable-content">
                <Menu
                  categ={"todas"}
                  prodsBuscados={homeBusqueda}
                  currentSlide={currentSlide}
                  handleClickEliminar={handleClickEliminar}
                  busqueda={busqueda}
                  setItemProd={setItemProd}
                  setProdID={setProdID}
                  setEditarProducto={setEditarProducto}
                  setNuevoProducto={setNuevoProducto}
                  setEditando={setEditando}
                />
              </div>
              {categorias.map(
                (categ) =>
                  home.some(
                    (prod) =>
                      prod.categoria.id === categ.id && prod.listado === true
                  ) && (
                    <div key={categ.id} className="scrollable-content">
                      {currentSlide !== 0 && (
                        <Menu
                          categ={categ.nombre}
                          currentSlide={currentSlide}
                          handleClickEliminar={handleClickEliminar}
                          busqueda={busqueda}
                          setItemProd={setItemProd}
                          setProdID={setProdID}
                          setEditarProducto={setEditarProducto}
                          setNuevoProducto={setNuevoProducto}
                          setEditando={setEditando}
                        />
                      )}
                    </div>
                  )
              )}
            </Swipe>
          )}
          {/* Clientes horizontal */}
          {!userActual && !vertical && (
            <div className="asideHeader">
              <div className="buttons">
                <button
                  onClick={() => {
                    setMiPedido(true);
                    setHistorial(false);
                  }}
                  className={miPedido ? "active" : ""}
                >
                  Mi Pedido
                </button>
                <button
                  onClick={() => {
                    setMiPedido(false);
                    setHistorial(true);
                    !historial && setBusqueda(false);
                  }}
                  className={historial ? "active" : ""}
                >
                  Mis Pedidos Realizados
                </button>
              </div>
            </div>
          )}
          {!userActual && !vertical && miPedido && (
            <MiPedido
              setEditarItemProd={setEditarItemProd}
              setIndexProd={setIndexProd}
              setProdID={setProdID}
            />
          )}
          {!userActual && !vertical && historial && <Historial />}
          {!userActual && !vertical && itemProd && prodID && (
            <ItemsCliente setItemProd={setItemProd} prodID={prodID} />
          )}
          {!userActual &&
            !vertical &&
            editarItemProd &&
            prodID &&
            (indexProd || indexProd === 0) && (
              <UpdateItemsCliente
                setEditarItemProd={setEditarItemProd}
                prodID={prodID}
                indexProd={indexProd}
              />
            )}
          {/* Usuarios horizontal */}
          {userActual && !vertical && (
            <div className="asideHeader">
              <div className="buttons">
                <button
                  onClick={() => {
                    setNuevoProducto(true);
                    setEditarProducto(false);
                  }}
                  className={nuevoProducto ? "active" : ""}
                >
                  Crear Producto o Combo
                </button>
                <button
                  onClick={() => {
                    handleEditar();
                  }}
                  className={`${editarProducto ? "active" : ""} ${
                    editando ? "" : "editarFalse"
                  }`}
                >
                  Editar
                </button>
              </div>
            </div>
          )}
          {userActual && !vertical && nuevoProducto && <NuevoProducto />}
          {userActual && !vertical && editarProducto && (
            <EditarProducto
              prodID={prodID}
              setEditarProducto={setEditarProducto}
              setNuevoProducto={setNuevoProducto}
              setEditando={setEditando}
            />
          )}
        </div>

        {/* Clientes horizontal */}
        {!userActual && vertical && (
          <>
            <footer className={`footer ${marginTop}`}>
              <Link className="botonFooter" to={"/miPedido"}>
                <div className="cantidad">{preciosArray.length}</div>
                <b className="verPedido">Mi Pedido</b>
                <div className="precio">${precioFinal}</div>
              </Link>
            </footer>
          </>
        )}
      </div>

      {alertaPregunta && (
        <Alerta
          tipo={"pregunta"}
          titulo={"Eliminar producto"}
          texto={`¿Estás seguro que quieres eliminar el producto "${alertaPregunta.nombre}"?`}
          estado={alertaPregunta}
          setEstado={setAlertaPregunta}
          callback={() => handleEliminarProducto(alertaPregunta.id)}
          aceptar={"Eliminar"}
        />
      )}
      {alertaError && (
        <Alerta
          tipo={"error"}
          titulo={"Error"}
          texto={alertaError.texto}
          estado={alertaError}
          setEstado={setAlertaError}
          callback={() => {
            setCheckAlertaError(false);
            window.location.reload();
          }}
        />
      )}
    </div>
  );
};

export default Carrusel;
