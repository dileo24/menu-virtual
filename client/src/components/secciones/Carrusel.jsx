import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "../formularios/Footer";
import Swipe from "react-swipe";

export default function Carrusel() {
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const categorias = useSelector((state) => state.categorias);
  // console.log(categorias);
  const handleContainerScroll = (e) => {
    const scrollPosition = e.target.scrollTop;
    const header = document.getElementById("containerHeader");
    const subHeader = document.getElementById("subHeader");
    const nav = document.getElementById("nav");
    const categorias = document.getElementById("categorias");
    const marca = document.getElementById("marca");

    if (scrollPosition >= /* 55 */ 110) {
      marca.style.marginBottom = "14vh";
      subHeader.style.position = "absolute";
      subHeader.style.top = "0";
      // Con animación suave
      // if (scrollPosition > prevScrollPosition) {
      //   if (!nav.classList.contains("nav-hidden")) {
      //     nav.classList.add("nav-hidden");
      //     categorias.classList.add("nav-hidden");
      //   }
      // } else {
      //   if (nav.classList.contains("nav-hidden")) {
      //     nav.classList.remove("nav-hidden");
      //     categorias.classList.remove("nav-hidden");
      //   }
      // }
      // Sin animación suave
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
      // Con animación suave
      // nav.classList.remove("categorias-hidden");
      // categorias.classList.remove("categorias-hidden");
      // Sin animación suave
      nav.style.visibility = "visible";
      categorias.style.position = "static";
      categorias.style.top = "";
    }
    setPrevScrollPosition(scrollPosition);
  };

  return (
    <div className="carruselContainer">
      <div className="carrusel-wrapper" onScroll={handleContainerScroll}>
        <Header />

        <Swipe className="swipe">
          {categorias.length && console.log(categorias)}
          {categorias.length &&
            categorias.map((categ) => (
              <div key={categ.id}>
                <Menu categoria={categ.nombre} />
              </div>
            ))}
          {/* <div>
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
          </div> */}
        </Swipe>
      </div>
      <Footer />
    </div>
  );
}
