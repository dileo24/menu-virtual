import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import VerMiPedido from "../formularios/VerMiPedido";
import Swipe from "react-swipe";

export default function Carrusel() {
  const sliderRef = useRef(null);
  const [headerPosition, setHeaderPosition] = useState(0);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);

  useEffect(() => {
    const handleTouchStart = () => {
      // Handle touch start event
    };

    const handleTouchMove = () => {
      // Handle touch move event
    };

    const handleTouchEnd = () => {
      // Handle touch end event
    };

    const swipeEl = sliderRef.current;

    swipeEl.onSwipeStart = handleTouchStart;
    swipeEl.onSwipeMove = handleTouchMove;
    swipeEl.onSwipeEnd = handleTouchEnd;

    return () => {
      swipeEl.onSwipeStart = null;
      swipeEl.onSwipeMove = null;
      swipeEl.onSwipeEnd = null;
    };
  }, []);

  // const handleContainerScroll = (e) => {
  //   const scrollPosition = e.target.scrollTop;
  //   setHeaderPosition(scrollPosition);
  //   const header = document.getElementById("containerHeader");
  //   const subHeader = document.getElementById("subHeader");
  //   const nav = document.getElementById("nav");
  //   const categorias = document.getElementById("categorias");

  //   if (scrollPosition >= 68) {
  //     header.style.marginBottom = "12vh";
  //     subHeader.style.position = "absolute";
  //     subHeader.style.top = "0";
  //     if (scrollPosition > prevScrollPosition) {
  //       if (!nav.classList.contains("categorias-hidden")) {
  //         nav.classList.add("categorias-hidden");
  //         categorias.classList.add("categorias-hidden");
  //       }
  //     } else {
  //       if (nav.classList.contains("categorias-hidden")) {
  //         nav.classList.remove("categorias-hidden");
  //         categorias.classList.remove("categorias-hidden");
  //       }
  //     }
  //   } else {
  //     header.style.marginBottom = "";
  //     subHeader.style.position = "static";
  //     subHeader.style.top = "";
  //     nav.classList.remove("categorias-hidden");
  //     categorias.classList.remove("categorias-hidden");
  //   }
  //   setPrevScrollPosition(scrollPosition);
  // };

  const sliderSettings = {
    continuous: false,
  };

  return (
    <div>
      <div className="carrusel-wrapper" /* onScroll={handleContainerScroll} */>
        <Header />

        <Swipe ref={sliderRef} {...sliderSettings}>
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
