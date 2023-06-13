import React, { useRef } from "react";
import Header from "./Header";
import Menu from "./Menu";
import VerMiPedido from "../formularios/VerMiPedido";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carrusel() {
  const sliderRef = useRef(null);

  // Función para manejar el desplazamiento táctil vertical
  const handleTouchScroll = (e) => {
    const deltaY =
      e.nativeEvent.touches[0].clientY -
      e.nativeEvent.changedTouches[0].clientY;
    const sliderEl = sliderRef.current.innerSlider.list;
    sliderEl.scrollTop += deltaY;
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    swipeToSlide: true, // Permite el cambio de pestaña horizontalmente con deslizamiento táctil
    touchMove: true, // Habilita el desplazamiento táctil vertical
  };

  return (
    <div>
      <Header />
      <div className="carrusel-wrapper" onTouchMove={handleTouchScroll}>
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
