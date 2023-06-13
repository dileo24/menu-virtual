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
  const handleContainerScroll = (e) => {
    const scrollPosition = e.target.scrollTop;
    setHeaderPosition(scrollPosition);
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
        <Header style={{ top: `${headerPosition}px` }} />
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
