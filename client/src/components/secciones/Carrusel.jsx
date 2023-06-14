import React, { useRef, useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import VerMiPedido from "../formularios/VerMiPedido";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carrusel() {
  const sliderRef = useRef(null);
  const [headerPosition, setHeaderPosition] = useState(0);

  // Función para manejar el desplazamiento táctil vertical
  const handleTouchScroll = (e) => {
    const deltaY =
      e.nativeEvent.touches[0].clientY -
      e.nativeEvent.changedTouches[0].clientY;
    const sliderEl = sliderRef.current.innerSlider.list;
    sliderEl.scrollTop += deltaY;
    setHeaderPosition(sliderEl.scrollTop);
  };

  // Actualizar la posición del Header al desplazarse verticalmente
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);

  const handleContainerScroll = (e) => {
    const scrollPosition = e.target.scrollTop;
    setHeaderPosition(scrollPosition);
    const subHeader = document.querySelector(".subHeader");
    const nav = document.querySelector(".nav");
    const categorias = document.querySelector(".categorias");
    const header = document.querySelector(".containerHeader");

    if (scrollPosition >= 120) {
      subHeader.classList.add("subHeaderAbsolute");
      header.classList.add("headerMargin");

      if (scrollPosition > prevScrollPosition) {
        if (!document.querySelector(".invisible")) {
          nav.classList.add("invisible");
          categorias.classList.add("categoriasRelative");
        }
      } else {
        if (document.querySelector(".invisible")) {
          nav.classList.remove("invisible");
          categorias.classList.remove("categoriasRelative");
        }
      }
    } else {
      if (scrollPosition <= 68) {
        nav.classList.remove("invisible");
        categorias.classList.remove("categoriasRelative");
        subHeader.classList.remove("subHeaderAbsolute");
        header.classList.remove("headerMargin");
      }
    }
    setPrevScrollPosition(scrollPosition);
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    swipeToSlide: true, // Permite el cambio de pestaña horizontalmente con deslizamiento táctil
    touchMove: true, // Habilita el desplazamiento táctil vertical
  };

  return (
    <div>
      <div
        className="carrusel-wrapper"
        onScroll={handleContainerScroll}
        onTouchMove={handleTouchScroll}
      >
        <Header />

        <Slider ref={sliderRef} {...sliderSettings}>
          <div>
            <Menu />
            <Menu />
            <Menu />
            <Menu />
          </div>
          <div>
            <Menu />
          </div>
          <div>
            <Menu />
          </div>
          <div>
            <Menu />
          </div>
          <div>
            <Menu />
          </div>
          <div>
            <Menu />
          </div>
          <div>
            <Menu />
          </div>
        </Slider>
      </div>
      <VerMiPedido />
    </div>
  );
}
