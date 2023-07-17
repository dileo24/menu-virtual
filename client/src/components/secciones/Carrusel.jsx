import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import Menu from "./Menu";
// import HacerPedido from "./HacerPedido1";
import { getProductos } from "../../redux/actions";
import Swipe from "react-swipe";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const Carrusel = () => {
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [diapositiva, setDiapositiva] = useState(0);
  // const prevDiapositivaRef = useRef(diapositiva);
  const carruselRef = useRef(null); // Referencia al contenedor principal
  const [preciosArray, setPreciosArray] = useState([]);
  const carrito = useSelector((state) => state.carrito);
  const userActual = useSelector((state) => state.userActual);
  let marginTop = carrito.length > 0 ? "" : "margen";
  let precioFinal = 0;
  for (let i = 0; i < preciosArray.length; i++) {
    precioFinal += parseInt(preciosArray[i]);
  }
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

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

  useEffect(() => {
    // Local
    const socket = io("http://localhost:3001");

    // Deploy
    // const socket = io("https://menu-virtual-production-9dbc.up.railway.app");

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

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
    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [handleWindowScroll]);

  const handleSwipe = useCallback((index) => {
    setCurrentSlide(index);
    window.scrollTo({ top: 0 });
  }, []);

  const handleSearch = useCallback(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    const precios = carrito.map((carritoItem) => carritoItem.precio);
    setPreciosArray(precios);

    // const nombres = carrito.map((carritoItem) => carritoItem.nombre);
    // setNombresProdArray(nombres);

    // setInput((prevInput) => ({
    //   ...prevInput,
    //   productos: nombres,
    //   precio: precios.reduce((acc, curr) => acc + parseInt(curr), 0),
    // }));
  }, [carrito]);

  useEffect(() => {
    const diapo = document.querySelector(
      `.scrollable-content[data-index="${currentSlide}"]`
    );
    if (diapo) {
      const menuContainer = diapo.querySelector(".menuContainer");
      const menuContainerHeight = menuContainer.offsetHeight;
      const swipe = document.querySelector(".swipe");
      swipe.style.maxHeight = `${menuContainerHeight}px`;
    }
  }, [currentSlide]);

  return (
    <div>
      <Header
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        handleSearch={handleSearch}
      />
      <div className="carruselContainer">
        <div className="carrusel-wrapper" ref={carruselRef}>
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
                        />
                      )}
                    </div>
                  )
              )}
            </Swipe>
          )}
        </div>
        {userActual ? null : (
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
    </div>
  );
};

export default Carrusel;
