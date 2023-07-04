import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import Menu from "./Menu";
import HacerPedido from "../secciones/HacerPedido";
import { getProductos } from "../../redux/actions";
import Swipe from "react-swipe";

const Carrusel = () => {
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [diapositiva, setDiapositiva] = useState(0);
  // const prevDiapositivaRef = useRef(diapositiva);
  const carruselRef = useRef(null); // Referencia al contenedor principal

  const dispatch = useDispatch();

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

  const handleWindowScroll = useCallback(() => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const subHeader = document.getElementById("subHeader");
    const nav = document.getElementById("nav");
    const categoriasEl = document.getElementById("categorias");
    const subCategoriasEl = document.querySelector(".subCategorias");
    const marca = document.getElementById("marca");

    if (scrollPosition >= 110) {
      if (subCategoriasEl) {
        marca.style.marginBottom = "20vh";
      } else {
        marca.style.marginBottom = "14vh";
      }
      subHeader.style.position = "fixed";
      subHeader.style.top = "0";
      if (scrollPosition > prevScrollPosition) {
        if (nav.style.visibility !== "hidden") {
          nav.style.visibility = "hidden";
          categoriasEl.style.position = "relative";
          categoriasEl.style.top = "-7vh";
          // subCategoriasEl.style.top = "-7vh";
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
    // setDiapositiva(index);
    window.scrollTo({ top: 0 }); // Desplazar hacia arriba
  }, []);

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
      <Header currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      <div className="carruselContainer">
        <div className="carrusel-wrapper" ref={carruselRef}>
          {categorias.length && (
            <Swipe
              className="swipe"
              swipeOptions={{
                startSlide: currentSlide,
                speed: 200,
                continuous: false,
                callback: handleSwipe,
              }}
            >
              <div className="scrollable-content">
                <Menu
                  categoria={"todas"}
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
                          categoria={categ.nombre}
                          currentSlide={currentSlide}
                        />
                      )}
                    </div>
                  )
              )}
            </Swipe>
          )}
        </div>
        <HacerPedido />
      </div>
    </div>
  );
};

export default Carrusel;
