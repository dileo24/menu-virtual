import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductos, getSubcategorias } from "../../redux/actions";
import Contador from "../recursos/Contador";
import { HiOutlinePencil } from "react-icons/hi2";
import { VscTrash } from "react-icons/vsc";
// import Alerta from "../recursos/Alerta";

export default function Menu({
  categ,
  prodsBuscados,
  currentSlide,
  handleClickEliminar,
  busqueda,
  setItemProd,
  setProdID,
  setEditarProducto,
  setNuevoProducto,
  setEditando,
}) {
  const userActual = useSelector((state) => state.userActual);
  const dispatch = useDispatch();
  let productosState = useSelector((state) => state.home);
  const categorias = useSelector((state) => state.categorias);
  const subcategorias = useSelector((state) => state.subcategorias);
  // Inside the component function
  const [imageErrors, setImageErrors] = useState({});

  // New function to handle image load errors for each image
  const handleIndividualImageLoadError = (id) => {
    setImageErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "No se pudo cargar la imagen desde la URL proporcionada.",
    }));
  };

  useEffect(() => {
    dispatch(getProductos());
    dispatch(getSubcategorias());
  }, [dispatch]);

  // let ultimaCategoria = "";
  let ultimaSubCategoria = "";

  // Función para quitar tildes y espacios
  const removeAccentsAndSpaces = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s/g, "");
  };

  let productos = productosState.filter((prod) =>
    categ !== "todas" ? prod.categoria.nombre === categ : prod
  );

  console.log(productos);

  // Filtrar los productos por categoría
  const filtrarProductosPorCategoria = (categoria) => {
    return productos.filter((prod) => prod.categoria.nombre === categoria);
  };

  prodsBuscados && prodsBuscados.length > 0 && (productos = prodsBuscados);

  const vertical = window.innerHeight > window.innerWidth;

  const primerNombreCateg = document.querySelector(".nombreCateg");
  !vertical &&
    primerNombreCateg &&
    primerNombreCateg.classList.add("primerNombre");

  const menuPC = document.querySelectorAll(".menuPC");
  if (menuPC) {
    menuPC.forEach((submenuPC) => {
      submenuPC.style.height = `calc(${window.innerHeight}px - 12vh)`;
    });
  }

  useEffect(() => {
    const menuPC = document.querySelectorAll(".menuPC");
    if (menuPC) {
      menuPC.forEach((submenuPC) => {
        submenuPC.style.height = `calc(${window.innerHeight}px - 12vh)`;
      });
    }
  }, [currentSlide]);

  useEffect(() => {
    const cardsContainer = document.querySelectorAll(".cardsContainer");
    if (busqueda) {
      if (cardsContainer) {
        cardsContainer.forEach((cardContainer) => {
          cardContainer.style.display = "block"; // O el estilo que desees
        });
      }
    } else {
      if (cardsContainer) {
        cardsContainer.forEach((cardContainer) => {
          cardContainer.style.display = "grid"; // O el estilo que desees
        });
      }
    }
  }, [busqueda]);

  const handleEdit = (id) => {
    setEditarProducto(true);
    setEditando(true);
    setProdID(id);
    setNuevoProducto(false);
  };

  return (
    productos && (
      <main id="menuContainer" className={vertical ? "menuMobile" : "menuPC"}>
        {busqueda && <h1 className="resultados">Resultados de búsqueda</h1>}
        {categorias.map((categoria) => {
          const productosPorCateg = filtrarProductosPorCategoria(
            categoria.nombre
          ).filter((producto) => producto.listado === true);

          // Comprobar que haya productos en la categoría
          const productosCategoria = productosPorCateg.filter(
            (prod) => prod.categoria.nombre === categoria.nombre
          );
          if (productosCategoria.length === 0) {
            // Si no hay prod en la categ, la saltea
            return null;
          }

          const productosSinSubcateg = productosPorCateg.filter(
            (prod) => prod.subcategoria === null
          );

          return (
            <div key={categoria.id}>
              {categ === "todas" &&
                (prodsBuscados.length === 0 ||
                  prodsBuscados.length === productosState.length) && (
                  <h1 className="nombreCateg">{categoria.nombre}</h1>
                )}

              {/* Renderizar los productos sin subcategoria */}
              <div className="cardsContainer">
                {productosSinSubcateg.map(
                  ({
                    nombre,
                    descripcion,
                    precio,
                    itemsExtra,
                    id,
                    cantidadPersonas,
                    subcategoria,
                    imagen,
                    combo,
                  }) => (
                    <div
                      key={id}
                      id={
                        subcategoria
                          ? removeAccentsAndSpaces(subcategoria.nombre)
                          : ""
                      }
                      className="cardProducto"
                    >
                      {imagen && imageErrors[id] === undefined ? (
                        <div className="nombreDescrImg">
                          <div className="nombreDescr">
                            <p className="nombre">{nombre}</p>
                            <p className="descripcion">{descripcion}</p>
                          </div>
                          <div className="imagenContainer">
                            <img
                              src={imagen}
                              alt="Imagen desde URL"
                              onError={() => handleIndividualImageLoadError(id)}
                              className="imagen"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="nombre">{nombre}</p>
                          <p className="descripcion">{descripcion}</p>
                        </div>
                      )}

                      <div className="precioAcciones">
                        <div className="acciones">
                          {userActual ? (
                            <>
                              {vertical ? (
                                <Link
                                  to={`/editarProducto?id=${id}`}
                                  className="iconContainer1"
                                >
                                  <HiOutlinePencil className="editarIcon" />
                                </Link>
                              ) : (
                                <button
                                  className="iconContainer1"
                                  onClick={() => handleEdit(id)}
                                >
                                  <HiOutlinePencil className="editarIcon" />
                                </button>
                              )}

                              <button
                                onClick={() => handleClickEliminar(id)}
                                className="iconContainer2"
                              >
                                <VscTrash className="eliminarIcon" />
                              </button>
                            </>
                          ) : (
                            <Contador
                              id={id}
                              nombre={nombre}
                              descripcion={descripcion}
                              precio={precio}
                              itemsExtra={itemsExtra}
                              cantidadPersonas={cantidadPersonas}
                              setProdID={setProdID}
                              setItemProd={setItemProd}
                              combo={combo}
                            />
                          )}
                        </div>
                        <p className="precio">${precio}</p>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Renderizar los productos con subcategoria */}
              {subcategorias.map((subcategoria) => {
                const productosPorSubCateg = productosPorCateg.filter(
                  (prod) =>
                    prod.subcategoria &&
                    prod.subcategoria.nombre === subcategoria.nombre
                );
                return (
                  <div className="cardsContainer" key={subcategoria.id}>
                    {/* Renderizar los productos con item === false */}
                    {productosPorSubCateg.map(
                      ({
                        nombre,
                        descripcion,
                        precio,
                        itemsExtra,
                        id,
                        cantidadPersonas,
                        subcategoria,
                        imagen,
                        combo,
                      }) => {
                        const esNuevaSubCategoria =
                          subcategoria.nombre !== ultimaSubCategoria;
                        if (esNuevaSubCategoria) {
                          ultimaSubCategoria = subcategoria.nombre;
                        }
                        return (
                          <div
                            key={id}
                            id={
                              subcategoria
                                ? removeAccentsAndSpaces(subcategoria.nombre)
                                : ""
                            }
                            className={!busqueda ? "cardMarginTop" : undefined}
                          >
                            {categ !== "todas" && esNuevaSubCategoria && (
                              <h1 className="nombreSubCateg">
                                {subcategoria.nombre}
                              </h1>
                            )}

                            {categ === "todas" &&
                              esNuevaSubCategoria &&
                              (prodsBuscados.length === 0 ||
                                prodsBuscados.length ===
                                  productosState.length) && (
                                <h1 className="nombreSubCateg">
                                  {subcategoria.nombre}
                                </h1>
                              )}
                            <div className="cardProducto">
                              {imagen && imageErrors[id] === undefined ? (
                                <div className="nombreDescrImg">
                                  <div className="nombreDescr">
                                    <p className="nombre">{nombre}</p>
                                    <p className="descripcion">{descripcion}</p>
                                  </div>
                                  <div className="imagenContainer">
                                    <img
                                      src={imagen}
                                      alt="Imagen desde URL"
                                      onError={() =>
                                        handleIndividualImageLoadError(id)
                                      }
                                      className="imagen"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <p className="nombre">{nombre}</p>
                                  <p className="descripcion">{descripcion}</p>
                                </div>
                              )}
                              <div className="precioAcciones">
                                <div className="acciones">
                                  {userActual ? (
                                    <>
                                      {vertical ? (
                                        <Link
                                          to={`/editarProducto?id=${id}`}
                                          className="iconContainer1"
                                        >
                                          <HiOutlinePencil className="editarIcon" />
                                        </Link>
                                      ) : (
                                        <button
                                          className="iconContainer1"
                                          onClick={() => handleEdit(id)}
                                        >
                                          <HiOutlinePencil className="editarIcon" />
                                        </button>
                                      )}

                                      <button
                                        onClick={() => handleClickEliminar(id)}
                                        className="iconContainer2"
                                      >
                                        <VscTrash className="eliminarIcon" />
                                      </button>
                                    </>
                                  ) : (
                                    <Contador
                                      id={id}
                                      nombre={nombre}
                                      descripcion={descripcion}
                                      precio={precio}
                                      itemsExtra={itemsExtra}
                                      cantidadPersonas={cantidadPersonas}
                                      setProdID={setProdID}
                                      setItemProd={setItemProd}
                                      combo={combo}
                                    />
                                  )}
                                </div>
                                <p className="precio">${precio}</p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/********* ITEMS NO VISIBLES *********/}
        {userActual &&
          productos.some((producto) => producto.listado === false) && (
            <h1 className="nombreCateg noVisibles">Items no visibles</h1>
          )}
        {userActual &&
          categorias.map((categoria) => {
            const productosPorCateg = filtrarProductosPorCategoria(
              categoria.nombre
            ).filter((producto) => producto.listado === false);

            // Comprobar que haya productos en la categoría
            const productosCategoria = productosPorCateg.filter(
              (prod) => prod.categoria.nombre === categoria.nombre
            );
            if (productosCategoria.length === 0) {
              // Si no hay prod en la categ, la saltea
              return null;
            }

            const productosSinSubcateg = productosPorCateg.filter(
              (prod) => prod.subcategoria === null
            );

            return (
              <div key={categoria.id}>
                {categ === "todas" &&
                  prodsBuscados.length === productosState.length && (
                    <h1 className="nombreCateg">{categoria.nombre}</h1>
                  )}

                {/* Renderizar los productos sin subcategoria */}
                <div className="cardsContainer">
                  {productosSinSubcateg.map(
                    ({
                      nombre,
                      descripcion,
                      precio,
                      itemsExtra,
                      id,
                      cantidadPersonas,
                      subcategoria,
                      imagen,
                    }) => (
                      <div
                        key={id}
                        id={
                          subcategoria
                            ? removeAccentsAndSpaces(subcategoria.nombre)
                            : ""
                        }
                        className="cardProducto"
                      >
                        {imagen && imageErrors[id] === undefined ? (
                          <div className="nombreDescrImg">
                            <div className="nombreDescr">
                              <p className="nombre">{nombre}</p>
                              <p className="descripcion">{descripcion}</p>
                            </div>
                            <div className="imagenContainer">
                              <img
                                src={imagen}
                                alt="Imagen desde URL"
                                onError={() =>
                                  handleIndividualImageLoadError(id)
                                }
                                className="imagen"
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="nombre">{nombre}</p>
                            <p className="descripcion">{descripcion}</p>
                          </div>
                        )}
                        <div className="precioAcciones">
                          <div className="acciones">
                            {userActual && (
                              <>
                                {vertical ? (
                                  <Link
                                    to={`/editarProducto?id=${id}`}
                                    className="iconContainer1"
                                  >
                                    <HiOutlinePencil className="editarIcon" />
                                  </Link>
                                ) : (
                                  <button
                                    className="iconContainer1"
                                    onClick={() => handleEdit(id)}
                                  >
                                    <HiOutlinePencil className="editarIcon" />
                                  </button>
                                )}

                                <button
                                  onClick={() => handleClickEliminar(id)}
                                  className="iconContainer2"
                                >
                                  <VscTrash className="eliminarIcon" />
                                </button>
                              </>
                            )}
                          </div>
                          <p className="precio">${precio}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Renderizar los productos con subcategoria */}
                {subcategorias.map((subcategoria) => {
                  const productosPorSubCateg = productosPorCateg.filter(
                    (prod) =>
                      prod.subcategoria &&
                      prod.subcategoria.nombre === subcategoria.nombre
                  );
                  return (
                    <div className="cardsContainer" key={subcategoria.id}>
                      {/* Renderizar los productos con item === false */}
                      {productosPorSubCateg.map(
                        ({
                          nombre,
                          descripcion,
                          precio,
                          itemsExtra,
                          id,
                          cantidadPersonas,
                          subcategoria,
                          imagen,
                        }) => {
                          const esNuevaSubCategoria =
                            subcategoria.nombre !== ultimaSubCategoria;
                          if (esNuevaSubCategoria) {
                            ultimaSubCategoria = subcategoria.nombre;
                          }
                          return (
                            <div
                              key={id}
                              id={
                                subcategoria
                                  ? removeAccentsAndSpaces(subcategoria.nombre)
                                  : ""
                              }
                              className={
                                !busqueda ? "cardMarginTop" : undefined
                              }
                            >
                              {categ !== "todas" && esNuevaSubCategoria && (
                                <h1 className="nombreSubCateg">
                                  {subcategoria.nombre}
                                </h1>
                              )}
                              {categ === "todas" &&
                                esNuevaSubCategoria &&
                                prodsBuscados.length ===
                                  productosState.length && (
                                  <h1 className="nombreSubCateg">
                                    {subcategoria.nombre}
                                  </h1>
                                )}
                              <div className="cardProducto">
                                {imagen && imageErrors[id] === undefined ? (
                                  <div className="nombreDescrImg">
                                    <div className="nombreDescr">
                                      <p className="nombre">{nombre}</p>
                                      <p className="descripcion">
                                        {descripcion}
                                      </p>
                                    </div>
                                    <div className="imagenContainer">
                                      <img
                                        src={imagen}
                                        alt="Imagen desde URL"
                                        onError={() =>
                                          handleIndividualImageLoadError(id)
                                        }
                                        className="imagen"
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <p className="nombre">{nombre}</p>
                                    <p className="descripcion">{descripcion}</p>
                                  </div>
                                )}
                                <div className="precioAcciones">
                                  <div className="acciones">
                                    {userActual && (
                                      <>
                                        {vertical ? (
                                          <Link
                                            to={`/editarProducto?id=${id}`}
                                            className="iconContainer1"
                                          >
                                            <HiOutlinePencil className="editarIcon" />
                                          </Link>
                                        ) : (
                                          <button
                                            className="iconContainer1"
                                            onClick={() => handleEdit(id)}
                                          >
                                            <HiOutlinePencil className="editarIcon" />
                                          </button>
                                        )}

                                        <button
                                          onClick={() =>
                                            handleClickEliminar(id)
                                          }
                                          className="iconContainer2"
                                        >
                                          <VscTrash className="eliminarIcon" />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                  <p className="precio">${precio}</p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </main>
    )
  );
}
