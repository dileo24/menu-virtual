import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "../formularios/Footer";
import { getProductos } from "../../redux/actions";
import Swipe from "react-swipe";

export default function Carrusel() {
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [diapositiva, setDiapositiva] = useState(0);
  const prevDiapositivaRef = useRef(diapositiva);
  const carruselRef = useRef(null); // Referencia al contenedor principal
  const categorias = useSelector((state) => state.categorias);
  const home = useSelector((state) => state.home);
  const homeBusqueda = useSelector((state) => state.homeBusqueda);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  useEffect(() => {
    if (diapositiva !== prevDiapositivaRef.current) {
      setCurrentSlide(diapositiva);
      setPrevScrollPosition(0); // Reiniciar la posición de desplazamiento al cambiar de categoría
      if (carruselRef.current) {
        carruselRef.current.scrollTo(0, 0); // Desplazar el contenedor al top 0
      }
    }
    prevDiapositivaRef.current = diapositiva;
  }, [diapositiva]);

  const handleContainerScroll = (e) => {
    const scrollPosition = e.target.scrollTop;
    const header = document.getElementById("containerHeader");
    const subHeader = document.getElementById("subHeader");
    const nav = document.getElementById("nav");
    const categorias = document.getElementById("categorias");
    const marca = document.getElementById("marca");

    if (scrollPosition >= 110) {
      marca.style.marginBottom = "14vh";
      subHeader.style.position = "absolute";
      subHeader.style.top = "0";
      if (scrollPosition > prevScrollPosition) {
        if (nav.style.visibility !== "hidden") {
          nav.style.visibility = "hidden";
          categorias.style.position = "relative";
          categorias.style.top = "-7vh";
        }
      } else {
        if (nav.style.visibility === "hidden") {
          nav.style.visibility = "visible";
          categorias.style.position = "static";
          categorias.style.top = "";
        }
      }
    } else {
      marca.style.marginBottom = "";
      subHeader.style.position = "static";
      subHeader.style.top = "";
      nav.style.visibility = "visible";
      categorias.style.position = "static";
      categorias.style.top = "";
    }
    setPrevScrollPosition(scrollPosition);
  };

  const handleSwipe = (index) => {
    setCurrentSlide(index);
    setDiapositiva(index);
  };

  return (
    <div className="carruselContainer">
      <div
        className="carrusel-wrapper"
        onScroll={handleContainerScroll}
        ref={carruselRef}
      >
        <Header currentSlide={currentSlide} setDiapositiva={setDiapositiva} />
        {categorias.length && (
          <Swipe
            className="swipe"
            swipeOptions={{
              startSlide: currentSlide,
              speed: 400,
              continuous: false,
              callback: handleSwipe,
            }}
          >
            <div>
              <Menu categoria={"todas"} prodsBuscados={homeBusqueda} />
            </div>
            {categorias.map((categ) => (
              <div key={categ.id}>
                {/* {
                  (home.filter(
                    (prod) => prod.categoria.id === categ.id ?
                    prodsFilter.push(prod)
                  ))
                } */}
                <div>
                  <Menu categoria={categ.nombre} />
                </div>
              </div>
            ))}
          </Swipe>
        )}
      </div>
      <Footer />
    </div>
  );
}
