import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "../formularios/Footer";
import Swipe from "react-swipe";

export default function Carrusel() {
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);

  const handleContainerScroll = (e) => {
    const scrollPosition = e.target.scrollTop;
    const header = document.getElementById("containerHeader");
    const subHeader = document.getElementById("subHeader");
    const nav = document.getElementById("nav");
    const categorias = document.getElementById("categorias");

    if (scrollPosition >= 55) {
      header.style.marginBottom = "14vh";
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

  return (
    <div>
      <div className="carrusel-wrapper" onScroll={handleContainerScroll}>
        <Header />

        <Swipe>
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
      <Footer />
    </div>
  );
}
