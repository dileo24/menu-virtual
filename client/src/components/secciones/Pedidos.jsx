import React, { useRef, useEffect, useState, useCallback } from "react";
import Header from "../recursos/Header";
import { useDispatch, useSelector } from "react-redux";
// import Filtros from "../recursos/Filtros";
import CardsPedidos from "../recursos/CardsPedidos";

// import io from "socket.io-client";

import Swipe from "react-swipe";

export default function Pedidos() {
  const [socket, setSocket] = useState(null);
  /* let allPedidos = [...nuevosPedidos, ...pedidos]; */
  const [currentSlide, setCurrentSlide] = useState(null);
  const [diapoActual, setDiapoActual] = useState(0);
  const scrollableRef = useRef(null);
  const [estadoActiveId, setEstadoActiveId] = useState(0);
  // const [inputData, setInputData] = useState([]);
  // const [busqueda, setBusqueda] = useState(false);
  // const [checkAlertaError, setCheckAlertaError] = useState(false);
  const estados = useSelector((state) => state.estados);
  // const [nuevosPedidos, setNuevosPedidos] = useState([]);
  const [openCardId, setOpenCardId] = useState(null);
  const vertical = window.innerHeight > window.innerWidth;

  useEffect(() => {
    scrollToEstadoActive();
    setEstadoActiveId(estados[currentSlide - 1]?.id);
  }, [currentSlide, estadoActiveId]);

  useEffect(() => {
    const diapo = document.querySelector(
      `.diapositiva[data-index="${currentSlide}"]`
    );
    if (diapo) {
      const diapoContainerHeight = diapo.offsetHeight;
      const swipe = document.querySelector(".swipe");
      swipe.style.maxHeight = `${diapoContainerHeight}px`;
      swipe.style.minHeight = `calc(${window.innerHeight}px - 12vh)`;
    }
  }, [currentSlide, openCardId]);

  const handleSwipe = useCallback((index) => {
    setCurrentSlide(index);
    setDiapoActual(index);
    window.scrollTo({ top: 0 });
  }, []);

  const scrollToEstadoActive = () => {
    if (scrollableRef.current) {
      const activeCategory = scrollableRef.current.querySelector(".active");
      if (activeCategory) {
        const containerWidth = scrollableRef.current.offsetWidth;
        const categoryWidth = activeCategory.offsetWidth;
        const categoryLeft = activeCategory.offsetLeft;
        const scrollLeft = categoryLeft - (containerWidth - categoryWidth) / 2;

        scrollableRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const pedidosContainerMobile = document.querySelector(
      ".pedidosContainerMobile"
    );
    if (pedidosContainerMobile) {
      pedidosContainerMobile.style.minHeight = `calc(${window.innerHeight}px)`;
    }
  }, [currentSlide, openCardId]);

  useEffect(() => {
    const estados = document.querySelector(".estados");
    if (estados && !vertical) {
      estados.style.minHeight = `calc(${window.innerHeight}px - 12vh)`;
    }
  }, []);

  return (
    <div
      id="productos"
      className={vertical ? "pedidosContainerMobile" : "pedidosContainerPC"}
    >
      <div className="header">
        <Header />
        {vertical && <h1 className="pedidosTitle">Pedidos</h1>}
        {/* <div className="navbar">
          <Filtros
            searchType="pedidos"
            searchWord={"pedidos"}
            setBusqueda={setBusqueda}
            setCheckAlertaError={setCheckAlertaError}
            className="navbar"
          />
        </div> */}
        <div
          className="estados"
          ref={scrollableRef}
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
          <button
            className={`menuBtn ${diapoActual === 0 ? "active" : ""}`}
            id="0"
            onClick={() => {
              setCurrentSlide(0);
              setDiapoActual(0);
              window.scrollTo({ top: 0 });
            }}
          >
            Todos
          </button>
          {estados &&
            estados.map((estado, index) => (
              <React.Fragment key={estado.id}>
                <button
                  className={`estado ${
                    currentSlide === index + 1 ? "active" : ""
                  }`}
                  id={estado.id}
                  onClick={() => {
                    setCurrentSlide(index + 1);
                    setDiapoActual(index + 1);

                    window.scrollTo({ top: 0 });
                  }}
                >
                  {estado.tipo}s
                </button>
              </React.Fragment>
            ))}
        </div>
      </div>

      <Swipe
        className="swipe"
        swipeOptions={{
          startSlide: currentSlide,
          speed: 300,
          continuous: false,
          callback: handleSwipe,
        }}
      >
        {/* Todos */}
        <div className="diapositiva">
          <CardsPedidos
            estado={false}
            openCardId={openCardId}
            setOpenCardId={setOpenCardId}
            currentSlide={currentSlide}
          />
          {!vertical && <div className="asideHeaderPC"></div>}
        </div>

        {/* Pendientes */}
        <div className="diapositiva">
          <CardsPedidos
            estado={1}
            openCardId={openCardId}
            setOpenCardId={setOpenCardId}
            currentSlide={currentSlide}
          />
          {!vertical && <div className="asideHeaderPC"></div>}
        </div>

        {/* Entregados */}
        <div className="diapositiva">
          <CardsPedidos
            estado={2}
            openCardId={openCardId}
            setOpenCardId={setOpenCardId}
            currentSlide={currentSlide}
          />
          {!vertical && <div className="asideHeaderPC"></div>}
        </div>

        {/* Pagados */}
        <div className="diapositiva">
          <CardsPedidos
            estado={3}
            openCardId={openCardId}
            setOpenCardId={setOpenCardId}
            currentSlide={currentSlide}
          />
          {!vertical && <div className="asideHeaderPC"></div>}
        </div>

        {/* Cancelados */}
        <div className="diapositiva">
          <CardsPedidos
            estado={4}
            openCardId={openCardId}
            setOpenCardId={setOpenCardId}
            currentSlide={currentSlide}
          />
          {!vertical && <div className="asideHeaderPC"></div>}
        </div>
      </Swipe>
    </div>
  );
}
