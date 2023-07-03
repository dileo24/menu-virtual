import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  cleanUserActual,
  getCategorias,
  getProductos,
  searchXname,
} from "../../redux/actions";
import Filtros from "../recursos/Filtros";
import { getPedidos, getSubcategorias } from "../../redux/actions";
import bandeja from "../../multmedia/bandeja.svg";
import login from "../../multmedia/login.svg";

export default function Header({ currentSlide, setCurrentSlide }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActual = useSelector((state) => state.userActual);
  const prods = useSelector((state) => state.home);
  const categorias = useSelector((state) => state.categorias);
  const subcategorias = useSelector((state) => state.subcategorias);
  const scrollableRef = useRef(null);
  const pedidos = useSelector((state) => state.pedidos);
  const [inputData, setInputData] = useState([]);
  const subCategsRef = useRef(null);

  useEffect(() => {
    const categActive = document.querySelector(".active");
    if (
      subcategorias.some(
        (subC) => Number(subC.categoria.id) === Number(categActive.id)
      )
    ) {
      const subCategs = subcategorias
        .filter((subC) => Number(subC.categoria.id) === Number(categActive.id))
        .map((subC) => subC.nombre);

      // Crear el elemento div
      const divElement = document.createElement("div");
      divElement.className = "subCategorias";
      document.querySelector("header").appendChild(divElement);

      // Recorrer el array subCategs
      subCategs.forEach((subC) => {
        const buttonElement = document.createElement("button");
        buttonElement.className = "subCategoria";
        buttonElement.textContent = subC;
        buttonElement.onclick = function () {
          // Código a ejecutar cuando se hace clic en el botón
          console.log("Botón " + subC + " fue clickeado");
        };
        divElement.appendChild(buttonElement);
      });

      subCategsRef.current = subCategs;
    } else {
      if (document.querySelector(".subCategorias")) {
        document.querySelector(".subCategorias").remove();
      }
      subCategsRef.current = null;
    }
  }, [subcategorias]);

  useEffect(() => {
    dispatch(getCategorias());
    dispatch(getPedidos());
    dispatch(getSubcategorias());
    dispatch(getProductos());

    scrollToActiveCategory();

    const handleStorageChange = () => {
      const savedInputs = localStorage.getItem("inputs");
      if (savedInputs) {
        setInputData(JSON.parse(savedInputs));
      }
    };
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch, currentSlide]);

  let pedidosActuales = inputData.map((idPed) =>
    pedidos.filter((ped) => {
      if (ped.id === idPed.id) {
        return ped.EstadoId !== 4 && ped.EstadoId !== 5;
      }
      return false;
    })
  );

  const pedidosNoVacios = pedidosActuales.filter((array) => array.length !== 0);

  const cerrarSesion = () => {
    let res = window.confirm(`Está seguro de querer cerrar su sesión?`);
    if (res === true) {
      dispatch(cleanUserActual(userActual.data.id));
    }
    navigate("/");
  };

  const reload = () => {
    dispatch(searchXname(""));
    navigate("/");
  };

  const scrollToActiveCategory = () => {
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

  const newCateg =
    categorias &&
    categorias.filter((c) =>
      prods.some((prod) => prod.categoria.id === c.id && prod.listado === true)
    );

  return (
    <header id="containerHeader" className="containerHeader">
      <button onClick={reload}>
        <h1 id="marca">QuickBites</h1>
      </button>
      <div id="subHeader" className="subHeader">
        <nav id="nav" className="nav">
          {userActual && userActual.data.RolId === 3 && (
            <Link to="/pedidos" className="pedidos">
              Pedidos
            </Link>
          )}
          {userActual && userActual.data.RolId === 1 && (
            <>
              <Link to="/nuevoProducto" className="nuevoProducto">
                Nuevo producto
              </Link>
              <Link to="/nuevaCateg" className="nuevaCateg">
                Administrar categorias
              </Link>
              <Link to="/pedidos" className="pedidos">
                Pedidos
              </Link>
              <Link to="/register" className="registrar">
                Crear cuenta para empleado
              </Link>
              <Link to="/usuarios" className="administrar">
                Administrar usuarios
              </Link>
              <Link to="/estadisticas" className="estadisticas">
                Estadisticas
              </Link>
            </>
          )}
          {userActual && userActual.data.RolId === 2 && (
            <>
              <Link to="/nuevoProducto" className="nuevoProducto">
                Nuevo producto
              </Link>
              <Link to="/nuevaCateg" className="nuevaCateg">
                Administrar categorias
              </Link>
              <Link to="/pedidos" className="pedidos">
                Pedidos
              </Link>
            </>
          )}
          {!userActual ? (
            <>
              <Link to="/login" className="iniciarSesion">
                <img src={login} alt="login" className="usuarioIcon" />
              </Link>
              <Filtros />
              <Link to="/carrito" className="carrito">
                <img src={bandeja} alt="bandeja" className="carritoIcon" />
                {pedidosNoVacios.length ? (
                  <div className="cantidadPedidos">
                    {pedidosNoVacios.length}
                  </div>
                ) : (
                  ""
                )}
              </Link>
            </>
          ) : (
            <button onClick={cerrarSesion} className="cerrarSesion">
              Cerrar sesión
            </button>
          )}
        </nav>
        <div
          id="categorias"
          className="categorias"
          ref={scrollableRef}
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
          <button
            className={`menuBtn ${currentSlide === 0 ? "active" : ""}`}
            id="0"
            onClick={() => {
              setCurrentSlide(0);
              window.scrollTo({ top: 0 });
            }}
          >
            Menú
          </button>
          {newCateg &&
            newCateg.map((categ, index) => (
              <React.Fragment key={categ.id}>
                <button
                  className={`categoria ${
                    currentSlide === index + 1 ? "active" : ""
                  }`}
                  id={categ.id}
                  onClick={() => {
                    setCurrentSlide(index + 1);
                    window.scrollTo({ top: 0 });
                  }}
                >
                  {categ.nombre}
                </button>
              </React.Fragment>
            ))}
        </div>
      </div>
    </header>
  );
}
