import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  cleanUserActual,
  getProductos,
  searchXname,
} from "../../redux/actions";
import Filtros from "../recursos/Filtros";
import { getPedidos } from "../../redux/actions";
import bandeja from "../../multmedia/bandeja.svg";
import login from "../../multmedia/login.svg";

export default function Header({ currentSlide, setCurrentSlide }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActual = useSelector((state) => state.userActual);
  const prods = useSelector((state) => state.home);
  const categorias = useSelector((state) => state.categorias);
  const scrollableRef = useRef(null);
  const pedidos = useSelector((state) => state.pedidos);
  const [inputData, setInputData] = useState([]);

  useEffect(() => {
    dispatch(getPedidos());
    dispatch(getProductos());

    const handleStorageChange = () => {
      const savedInputs = localStorage.getItem("inputs");
      if (savedInputs) {
        setInputData(JSON.parse(savedInputs));
      }
    };

    // Llamar a la función de manejo del evento de cambio al cargar la página
    handleStorageChange();

    // Agregar el listener del evento de cambio en el localStorage usando useEffect
    window.addEventListener("storage", handleStorageChange);

    // Eliminar el listener del evento de cambio en el localStorage al desmontar el componente
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

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

  useEffect(() => {
    scrollToActiveCategory();
  }, [currentSlide]);

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
                  <div className="pedidos">{pedidosNoVacios.length}</div>
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
            onClick={() => {
              setCurrentSlide(0);
              window.scrollTo({ top: 0 });
            }}
          >
            Menú
          </button>

          {categorias &&
            categorias.map(
              (categ) =>
                prods.some(
                  (prod) =>
                    prod.categoria.id === categ.id && prod.listado === true
                ) && (
                  <button
                    key={categ.id}
                    className={`categoria ${
                      currentSlide === categ.id ? "active" : ""
                    }`}
                    onClick={() => {
                      setCurrentSlide(categ.id);
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    {categ.nombre}
                  </button>
                )
            )}
        </div>
      </div>
    </header>
  );
}
