import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import VerMiPedido from "../formularios/VerMiPedido";
import Swipe from "react-swipe";

export default function Carrusel() {
  // const sliderRef = useRef(null);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  // const [headerPosition, setHeaderPosition] = useState(0);
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const [isFirstSlide, setIsFirstSlide] = useState(true);
  // const [isLastSlide, setIsLastSlide] = useState(false);

  // useEffect(() => {
  //   const handleTouchStart = () => {
  //   };

  //   const handleTouchMove = () => {};

  //   const handleTouchEnd = () => {};

  //   return () => {
  //   };
  // }, [isFirstSlide, isLastSlide]);

  const handleContainerScroll = (e) => {
    const scrollPosition = e.target.scrollTop;
    // setHeaderPosition(scrollPosition);
    const header = document.getElementById("containerHeader");
    const subHeader = document.getElementById("subHeader");
    const nav = document.getElementById("nav");
    const categorias = document.getElementById("categorias");

    if (scrollPosition >= 68) {
      header.style.marginBottom = "12vh";
      subHeader.style.position = "absolute";
      subHeader.style.top = "0";
      if (scrollPosition > prevScrollPosition) {
        if (!nav.classList.contains("categorias-hidden")) {
          nav.classList.add("categorias-hidden");
          categorias.classList.add("categorias-hidden");
        }
      } else {
        if (nav.classList.contains("categorias-hidden")) {
          nav.classList.remove("categorias-hidden");
          categorias.classList.remove("categorias-hidden");
        }
      }
    } else {
      header.style.marginBottom = "";
      subHeader.style.position = "static";
      subHeader.style.top = "";
      nav.classList.remove("categorias-hidden");
      categorias.classList.remove("categorias-hidden");
    }
    setPrevScrollPosition(scrollPosition);
  };

  // const handleSlideChange = (index) => {
  //   setCurrentSlide(index);
  //   setIsFirstSlide(index === 0);
  //   setIsLastSlide(index === 6); // Asegúrate de ajustar este valor al número total de diapositivas - 1
  // };

  // const sliderSettings = {
  //   continuous: false,
  //   callback: handleSlideChange, // Agrega esta línea para manejar el cambio de diapositiva
  // };

  return (
    <div>
      <div className="carrusel-wrapper" onScroll={handleContainerScroll}>
        <Header />

        <Swipe /* ref={sliderRef} */ /* {...sliderSettings} */>
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
        </Swipe>
      </div>
      <VerMiPedido />
    </div>
  );
}
