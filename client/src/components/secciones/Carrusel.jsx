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

  // const handleContainerScroll = (e) => {
  //   const scrollPosition = e.target.scrollTop;
  //   setHeaderPosition(scrollPosition);
  //   const subHeader = document.querySelector(".subHeader");
  //   const nav = document.querySelector(".nav");
  //   const categorias = document.querySelector(".categorias");
  //   const header = document.querySelector(".containerHeader");

  //   if (scrollPosition >= 120) {
  //     subHeader.classList.add("subHeaderAbsolute");
  //     header.classList.add("headerMargin");

  //     if (scrollPosition > prevScrollPosition) {
  //       if (!document.querySelector(".invisible")) {
  //         nav.classList.add("invisible");
  //         categorias.classList.add("categoriasRelative");
  //       }
  //     } else {
  //       if (document.querySelector(".invisible")) {
  //         nav.classList.remove("invisible");
  //         categorias.classList.remove("categoriasRelative");
  //       }
  //     }
  //   } else {
  //     if (scrollPosition <= 68) {
  //       nav.classList.remove("invisible");
  //       categorias.classList.remove("categoriasRelative");
  //       subHeader.classList.remove("subHeaderAbsolute");
  //       header.classList.remove("headerMargin");
  //     }
  //   }
  //   setPrevScrollPosition(scrollPosition);
  // };

  const handleContainerScroll = (e) => {
    const scrollPosition = e.target.scrollTop;
    setHeaderPosition(scrollPosition);
    const header = document.getElementById("containerHeader");
    const subHeader = document.getElementById("subHeader");
    const nav = document.getElementById("nav");
    const categorias = document.getElementById("categorias");

    if (scrollPosition >= 120) {
      header.style.marginBottom = "12vh";
      subHeader.style.position = "absolute";
      subHeader.style.top = "0";

      if (scrollPosition > prevScrollPosition) {
        if (nav.style.visibility !== "hidden") {
          nav.style.visibility = "hidden";
          categorias.style.position = "relative";
          categorias.style.top = "-6vh";
        }
      } else {
        if (nav.style.visibility === "hidden") {
          nav.style.visibility = "visible";
          categorias.style.position = "";
          categorias.style.top = "";
        }
      }
    } else {
      if (scrollPosition <= 68) {
        header.style.marginBottom = "";
        subHeader.style.position = "";
        subHeader.style.top = "";
        nav.style.visibility = "visible";
        categorias.style.position = "";
        categorias.style.top = "";
      }
    }
    setPrevScrollPosition(scrollPosition);
  };

  const sliderSettings = {
    infinite: false,
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
