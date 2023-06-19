import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "../formularios/Footer";
import Swipe from "react-swipe";

export default function Carrusel() {
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const categorias = useSelector((state) => state.categorias);
  const homeBusqueda = useSelector((state) => state.homeBusqueda);

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

  return (
    <div className="carruselContainer">
      <div className="carrusel-wrapper" onScroll={handleContainerScroll}>
        <Header />
        {categorias.length && (
          <Swipe className="swipe">
            <div id="todas">
              <Menu categoria={"todas"} prodsBuscados={homeBusqueda} />
            </div>
            {categorias.map((categ) => (
              <div id={categ.nombre} key={categ.id}>
                <Menu categoria={categ.nombre} />
              </div>
            ))}
          </Swipe>
        )}
      </div>
      <Footer />
    </div>
  );
}
