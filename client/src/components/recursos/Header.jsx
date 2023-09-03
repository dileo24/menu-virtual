import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  cleanUserActual,
  getCategorias,
  getProductos,
  searchXname,
} from "../../redux/actions";
import Filtros from "./Filtros";
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
// import { IoIosStats } from "react-icons/io";
import Alerta from "../recursos/Alerta";

export default function Header({
  currentSlide,
  setCurrentSlide,
  setBusqueda,
  busqueda,
  setCheckAlertaError,
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
  const [categActiveId, setCategActiveId] = useState(0);
  // const [focusedSubcategory, setFocusedSubcategory] = useState(null);
  const [navSideOpen, setNavSideOpen] = useState(false);
  const isHomePage = window.location.pathname === "/";
  const [alertaPregunta, setAlertaPregunta] = useState(false);

  useEffect(() => {
    dispatch(getCategorias());
    dispatch(getPedidos());
    dispatch(getSubcategorias());
    dispatch(getProductos());
  }, [dispatch]);

  // Controlar orientación de la pantalla
  /* useEffect(() => {
    const header = document.querySelector("#containerHeader");
    if (window.innerHeight > window.innerWidth) {
      header.classList.add("headerMobile");
      header.classList.remove("headerPC");
    } else {
      header.classList.add("headerPC");
      header.classList.remove("headerMobile");
    }
  }, []);
  useEffect(() => {
    const header = document.querySelector("#containerHeader");
    const handleResize = () => {
      if (window.innerHeight > window.innerWidth) {
        header.classList.add("headerMobile");
        header.classList.remove("headerPC");
      } else {
        header.classList.add("headerPC");
        header.classList.remove("headerMobile");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); */

  useEffect(() => {
    window.innerWidth <= 600 && scrollToActiveCategory();
    setCategActiveId(newCateg[currentSlide - 1]?.id);
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
  }, [currentSlide, categActiveId]);

  let pedidosActuales = inputData.filter((idPed) =>
    pedidos.some(
      (ped) => ped.id === idPed.id && ped.EstadoId !== 4 && ped.EstadoId !== 5
    )
  );

  const pedidosNoVacios = pedidosActuales.filter((array) => array.length !== 0);

  const cerrarSesion = () => {
    dispatch(cleanUserActual(userActual.data.id));
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
    if (navSide && vertical) {
      navSide.classList.add("animate-left");
      setTimeout(() => {
        navSide.classList.remove("animate-left");
        setNavSideOpen(false);
      }, 100);
    }
  };

  // Función para quitar tildes y espacios
  const removeAccentsAndSpaces = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s/g, "");
  };

  const handleButtonClick = (subC) => {
    // Obtener el elemento con el atributo "data-index" igual a "currentSlide"
    const currentSlideElement = document.querySelector(
      `[data-index='${currentSlide}']`
    );
    // Buscar todos los elementos con el id "subC.nombre" dentro del elemento currentSlideElement
    const elementos = currentSlideElement.querySelectorAll(
      `#${removeAccentsAndSpaces(subC.nombre)}`
    );

    // Verificar si se encontraron elementos y scrollear hasta el primer elemento
    if (elementos.length > 0) {
      // const diapo = document.querySelector('[data-index="1"]');
      // const menuComponent = diapo.querySelector(".menuPC");
      // console.log(menuComponent);
      const firstElement = elementos[0];
      const elementRect = firstElement.getBoundingClientRect();
      const offsetTop =
        window.scrollY + elementRect.top - window.innerHeight * 0.2; // Desplazamiento de -20vh

      console.log(offsetTop);

      /* vertical
        ? */ window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      // : menuComponent.scrollTo({
      //     top: offsetTop,
      //     behavior: "smooth",
      //   });
    }
  };

  const vertical = window.innerHeight > window.innerWidth;

  const headerPC = document.querySelector(".headerPC");
  if (headerPC) {
    const categsYSubcategs = headerPC.querySelector(".categsYSubcategs");
    if (categsYSubcategs) {
      categsYSubcategs.style.height = `calc(${window.innerHeight}px - 12vh)`;
    }
  }

  return (
    <header
      id="containerHeader"
      className={vertical ? "headerMobile" : "headerPC"}
    >
      {!userActual && vertical && (
        <button className="quickBites" onClick={reload}>
          <h1 id="marca">QuickBites</h1>
        </button>
      )}
      <div id="subHeader" className="subHeader">
        {userActual && (
          <div id="nav" className="headerUsuarios">
            {/* Empleados: No tienen header, solo botón de cerrar sesión y sección de pedidos */}
            {userActual && userActual.data.RolId === 3 && (
              <button
                onClick={() => setAlertaPregunta(true)}
                className="cerrarSesion"
              >
                <RxExit className="linkIcon" />
                Cerrar sesión
              </button>
            )}
            {/* Admins y superAdmin */}
            {userActual && userActual.data.RolId <= 2 && (
              <>
                {vertical && (
                  <div
                    className="burgerBtn"
                    onClick={() =>
                      !navSideOpen
                        ? setNavSideOpen(true)
                        : setNavSideOpen(false)
                    }
                  >
                    <RxHamburgerMenu className="burgerIcon" />
                  </div>
                )}

                {(vertical && navSideOpen) || !vertical ? (
                  <div className="navSideCont">
                    <div
                      className={`navSide ${vertical ? "animate-right" : ""}`}
                    >
                      {vertical && (
                        <div className="navSideHeader">
                          <div
                            className="cerrarBtn"
                            onClick={() => ocultarNavSide()}
                          >
                            <GrClose className="closeIcon" />
                          </div>
                        </div>
                      )}

                      <div className="navSideContent">
                        {vertical && (
                          <div className="userData">
                            <div className="userNameRol">
                              <p>
                                {userActual.data.nombre}{" "}
                                {userActual.data.apellido}
                              </p>
                              {userActual.data.RolId === 1 ? (
                                <div className="rol">• Súper Admin</div>
                              ) : (
                                <div className="rol">• Admin</div>
                              )}
                            </div>
                            <p className="userEmail">{userActual.data.email}</p>
                          </div>
                        )}

                        <div className="btnsAdmins">
                          {vertical && (
                            <>
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
                            </>
                          )}
                          <Link
                            to="/"
                            className={`links ${
                              window.location.pathname === "/"
                                ? "linkActual"
                                : ""
                            }`}
                          >
                            <BiFoodMenu className="linkIcon" />
                            Menú
                          </Link>
                          {!vertical ? (
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
                          ) : (
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
                          )}
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
                          {userActual.data.RolId === 1 && (
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
                          )}
                        </div>
                        {!vertical ? (
                          <div className="userCerrar">
                            <div className="userData">
                              <div className="userNameRol">
                                <p>
                                  {userActual.data.nombre}{" "}
                                  {userActual.data.apellido}
                                </p>
                              </div>
                              <div className="rol">• Súper Admin</div>

                              <p className="userEmail">
                                {userActual.data.email}
                              </p>
                            </div>
                            <button
                              onClick={() => setAlertaPregunta(true)}
                              className="cerrarSesion"
                            >
                              <RxExit className="linkIcon" />
                              Cerrar sesión
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setAlertaPregunta(true)}
                            className="cerrarSesion"
                          >
                            <RxExit className="linkIcon" />
                            Cerrar sesión
                          </button>
                        )}
                      </div>
                    </div>
                    <div
                      className="navSideOut"
                      onClick={() => ocultarNavSide()}
                    ></div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        )}

        {/* Clientes */}
        {!userActual && (
          <nav id="nav" className="nav headerClientes">
            {vertical && !busqueda && (
              <Link to="/login" className="loginBtn">
                <div className="iniciarSesion">
                  <img src={login} alt="login" className="usuarioIcon" />
                </div>
              </Link>
            )}
            {!vertical && (
              <Link to="/login" className="loginBtn">
                <div className="iniciarSesion">
                  <img src={login} alt="login" className="usuarioIcon" />
                </div>
                <p>Iniciar sesión</p>
              </Link>
            )}

            <div className={!busqueda ? "navbarCont" : "navbarContBuscado"}>
              <Filtros
                setCurrentSlide={setCurrentSlide}
                searchWord={"productos"}
                setBusqueda={setBusqueda}
                setCheckAlertaError={setCheckAlertaError}
                busqueda={busqueda}
              />
            </div>
            {!busqueda && vertical && (
              <Link to="/historial" className="carrito">
                <img src={bandeja} alt="bandeja" className="carritoIcon" />
                {pedidosNoVacios.length ? (
                  <div className="cantidadPedidos">
                    {pedidosNoVacios.length}
                  </div>
                ) : (
                  ""
                )}
              </Link>
            )}
            {!vertical && <p className="marcaPC">QuickBites</p>}
          </nav>
        )}

        {isHomePage && (
          <>
            {userActual && userActual.data.RolId <= 2 && (
              <div className="headerHomeUsuarios">
                {vertical && <h1>Administrar Menú</h1>}

                <Filtros
                  setCurrentSlide={setCurrentSlide}
                  searchWord={"productos"}
                  setBusqueda={setBusqueda}
                  busqueda={busqueda}
                  setCheckAlertaError={setCheckAlertaError}
                />
              </div>
            )}
            {(vertical && !busqueda) || !vertical ? (
              <div id="categorias" className="categsYSubcategs">
                <div className="categorias" ref={scrollableRef}>
                  <div className="botonesCont">
                    {!vertical && <p className="categTitle">Categorías</p>}

                    <div className="botones">
                      <button
                        className={`menuBtn ${
                          currentSlide === 0 ? "active" : ""
                        }`}
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
                                setBusqueda(false);
                              }}
                            >
                              {categ.nombre}
                            </button>
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                </div>

                {newSubCategs.filter(
                  (subC) => subC.categoria.id === categActiveId
                ).length >= 2 && (
                  <div className="subCategorias">
                    <div className="botonesCont">
                      {!vertical && (
                        <p className="subCategTitle">SubCategorías</p>
                      )}

                      <div className="botones">
                        {newSubCategs
                          .filter((subC) => subC.categoria.id === categActiveId)
                          .map((subC) => (
                            <button
                              /* className={`subCategoria ${
                              subC === focusedSubcategory ? "focused" : ""
                            }`} */
                              className="subCategoria"
                              key={subC.nombre}
                              onClick={() => {
                                // setFocusedSubcategory(subC);
                                vertical && handleButtonClick(subC);
                              }}
                            >
                              {subC.nombre}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </>
        )}
      </div>

      {alertaPregunta && (
        <Alerta
          tipo={"pregunta"}
          titulo={"Cerrar sesión"}
          texto={`¿Estás seguro que quieres cerrar sesión?`}
          estado={alertaPregunta}
          setEstado={setAlertaPregunta}
          callback={cerrarSesion}
          aceptar={"Cerrar sesión"}
        />
      )}
    </header>
  );
}
