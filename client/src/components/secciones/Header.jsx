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
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import { CiForkAndKnife } from "react-icons/ci";
import { BsTags } from "react-icons/bs";
import { RxExit } from "react-icons/rx";
import { BiFoodMenu } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { IoIosStats } from "react-icons/io";

export default function Header({
  currentSlide,
  setCurrentSlide,
  handleSearch,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActual = useSelector((state) => state.userActual);
  const prods = useSelector((state) => state.home);
  const categorias = useSelector((state) => state.categorias);
  const subcategorias = useSelector((state) => state.subcategorias);
  const scrollableRef = useRef(null);
  const pedidos = useSelector((state) => state.pedidos);
  const [inputData, setInputData] = useState([]);
  const categActive = document.querySelector(".active");
  const [focusedSubcategory, setFocusedSubcategory] = useState(null);
  const [navSideOpen, setNavSideOpen] = useState(false);
  const isHomePage = window.location.pathname === "/";

  useEffect(() => {
    dispatch(getCategorias());
    dispatch(getPedidos());
    dispatch(getSubcategorias());
    dispatch(getProductos());
  }, [dispatch]);

  useEffect(() => {
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
  }, [currentSlide]);

  let pedidosActuales = inputData.filter((idPed) =>
    pedidos.some(
      (ped) => ped.id === idPed.id && ped.EstadoId !== 4 && ped.EstadoId !== 5
    )
  );

  const pedidosNoVacios = pedidosActuales.filter((array) => array.length !== 0);

  const cerrarSesion = () => {
    let res = window.confirm(`Está seguro de querer cerrar su sesión?`);
    res && dispatch(cleanUserActual(userActual.data.id));
    setNavSideOpen(false);
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

  const newSubCategs = subcategorias.filter((subcategoria) =>
    prods.some(
      (prod) => prod.subcategoria && prod.subcategoria.id === subcategoria.id
    )
  );

  useEffect(() => {
    if (navSideOpen) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }
  }, [navSideOpen]);

  const ocultarNavSide = () => {
    const navSide = document.querySelector(".navSide");
    if (navSide) {
      navSide.classList.add("animate-left");
      setTimeout(() => {
        navSide.classList.remove("animate-left");
        setNavSideOpen(false);
      }, 100);
    }
  };

  return (
    <header id="containerHeader" className="containerHeader">
      {!userActual && (
        <button className="quickBites" onClick={reload}>
          <h1 id="marca">QuickBites</h1>
        </button>
      )}
      <div id="subHeader" className="subHeader">
        {userActual && (
          <div id="nav" className="headerUsuarios">
            {/* Empleados: No tienen header, solo sección de pedidos */}
            {userActual && userActual.data.RolId === 3 && (
              <button onClick={cerrarSesion} className="cerrarSesion">
                Cerrar sesión
              </button>
            )}
            {/* Admins y superAdmin */}
            {userActual && userActual.data.RolId <= 2 && (
              <>
                <div
                  className="burgerBtn"
                  onClick={() =>
                    !navSideOpen ? setNavSideOpen(true) : setNavSideOpen(false)
                  }
                >
                  <RxHamburgerMenu className="burgerIcon" />
                </div>
              </>
            )}
            {navSideOpen && (
              <div className="navSideCont">
                <div className="navSide animate-right">
                  <div className="navSideHeader">
                    <div className="cerrarBtn" onClick={() => ocultarNavSide()}>
                      <GrClose className="closeIcon" />
                    </div>
                  </div>
                  {/* superAdmin */}
                  {userActual && userActual.data.RolId === 1 && (
                    <div className="navSideContent">
                      <div className="userData">
                        <div className="userNameRol">
                          <p>
                            {userActual.data.nombre} {userActual.data.apellido}
                          </p>
                          <div className="rol">• Súper Admin</div>
                        </div>
                        <p className="userEmail">{userActual.data.email}</p>
                      </div>

                      <p className="navSideTitles">Principal</p>

                      <Link
                        to="/pedidos"
                        className={`pedidos links ${
                          window.location.href.includes("pedidos")
                            ? "linkActual"
                            : ""
                        }`}
                      >
                        <img
                          src={bandeja}
                          alt="bandeja"
                          className="linkIconPedidos"
                        />
                        Pedidos
                      </Link>

                      <p className="navSideTitles">Administrar</p>
                      <Link
                        to="/"
                        className={`links ${
                          window.location.pathname === "/" ? "linkActual" : ""
                        }`}
                      >
                        <BiFoodMenu className="linkIcon" />
                        Menú
                      </Link>
                      <Link
                        to="/nuevoProducto"
                        className={`nuevoProducto links ${
                          window.location.href.includes("nuevoProducto")
                            ? "linkActual"
                            : ""
                        }`}
                      >
                        <CiForkAndKnife className="linkIcon" />
                        Nuevo Producto
                      </Link>
                      <Link
                        to="/adminCateg"
                        className={`adminCateg links ${
                          window.location.href.includes("adminCateg")
                            ? "linkActual"
                            : ""
                        }`}
                      >
                        <BsTags className="linkIcon" />
                        Categorias
                      </Link>
                      {/* <Link to="/register" className="registrar">
                        Crear cuenta para empleado
                      </Link> */}
                      <Link
                        to="/usuarios"
                        className={`usuarios links ${
                          window.location.href.includes("usuarios")
                            ? "linkActual"
                            : ""
                        }`}
                      >
                        <FiUsers className="linkIcon" />
                        Usuarios
                      </Link>

                      <p className="navSideTitles">Reportes</p>

                      <Link
                        to="/estadisticas"
                        className={`estadisticas links ${
                          window.location.href.includes("estadisticas")
                            ? "linkActual"
                            : ""
                        }`}
                      >
                        <IoIosStats className="linkIcon" />
                        Estadisticas
                      </Link>
                      <button onClick={cerrarSesion} className="cerrarSesion">
                        <RxExit className="linkIcon" />
                        Cerrar sesión
                      </button>
                    </div>
                  )}

                  {/* Admin */}
                  {userActual && userActual.data.RolId === 2 && (
                    <div className="navSideContent">
                      <div className="userData">
                        <div className="userNameRol">
                          <p>
                            {userActual.data.nombre} {userActual.data.apellido}
                          </p>
                          <div className="rol">• Admin</div>
                        </div>
                        <p className="userEmail">{userActual.data.email}</p>
                      </div>

                      <p className="navSideTitles">Principal</p>

                      <Link
                        to="/pedidos"
                        className={`pedidos links ${
                          window.location.href.includes("pedidos")
                            ? "linkActual"
                            : ""
                        }`}
                      >
                        <img
                          src={bandeja}
                          alt="bandeja"
                          className="linkIconPedidos"
                        />
                        Pedidos
                      </Link>

                      <p className="navSideTitles">Administrar</p>
                      <Link
                        to="/"
                        className={`links ${
                          window.location.pathname === "/" ? "linkActual" : ""
                        }`}
                      >
                        <BiFoodMenu className="linkIcon" />
                        Menú
                      </Link>
                      <Link
                        to="/nuevoProducto"
                        className={`nuevoProducto links ${
                          window.location.href.includes("nuevoProducto")
                            ? "linkActual"
                            : ""
                        }`}
                      >
                        <CiForkAndKnife className="linkIcon" />
                        Nuevo Producto
                      </Link>
                      <Link
                        to="/adminCateg"
                        className={`adminCateg links ${
                          window.location.href.includes("adminCateg")
                            ? "linkActual"
                            : ""
                        }`}
                      >
                        <BsTags className="linkIcon" />
                        Categorias
                      </Link>
                      <button onClick={cerrarSesion} className="cerrarSesion">
                        <RxExit className="linkIcon" />
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
                <div
                  className="navSideOut"
                  onClick={() => ocultarNavSide()}
                ></div>
              </div>
            )}
          </div>
        )}

        {/* Clientes */}
        {!userActual && (
          <nav id="nav" className="nav headerClientes">
            <Link to="/login" className="iniciarSesion">
              <img src={login} alt="login" className="usuarioIcon" />
            </Link>
            <div className="navbarCont">
              <Filtros handleSearch={handleSearch} />
            </div>
            <Link to="/historial" className="carrito">
              <img src={bandeja} alt="bandeja" className="carritoIcon" />
              {pedidosNoVacios.length ? (
                <div className="cantidadPedidos">{pedidosNoVacios.length}</div>
              ) : (
                ""
              )}
            </Link>
          </nav>
        )}

        {isHomePage && (
          <>
            {userActual && userActual.data.RolId <= 2 && (
              <div className="headerHomeUsuarios">
                <h1>Administrar Menú</h1>
                <Filtros handleSearch={handleSearch} />
              </div>
            )}
            <div id="categorias">
              <div
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
                  Menú completo
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

              {categActive &&
                newSubCategs.some(
                  (subC) => subC.categoria.id === Number(categActive.id)
                ) && (
                  <div className="subCategorias">
                    {newSubCategs
                      .filter(
                        (subC) => subC.categoria.id === Number(categActive.id)
                      )
                      .map((subC) => (
                        <button
                          className={`subCategoria ${
                            subC === focusedSubcategory ? "focused" : ""
                          }`}
                          key={subC.nombre}
                          onClick={() => {
                            // Código a ejecutar cuando se hace clic en la subcategoría
                            setFocusedSubcategory(subC);
                            console.log(
                              "Botón " + subC.nombre + " fue clickeado"
                            );
                          }}
                        >
                          {subC.nombre}
                        </button>
                      ))}
                  </div>
                )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
