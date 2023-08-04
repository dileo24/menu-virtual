import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductos, getSubcategorias } from "../../redux/actions";
import Contador from "../recursos/Contador";
import { HiOutlinePencil } from "react-icons/hi2";
import { VscTrash } from "react-icons/vsc";
import Alerta from "../recursos/Alerta";

export default function Menu({
  categ,
  prodsBuscados,
  handleClickEliminar,
  busqueda,
}) {
  const userActual = useSelector((state) => state.userActual);
  const dispatch = useDispatch();
  let productosState = useSelector((state) => state.home);
  const categorias = useSelector((state) => state.categorias);
  const subcategorias = useSelector((state) => state.subcategorias);

  useEffect(() => {
    dispatch(getProductos());
    dispatch(getSubcategorias());
  }, [dispatch]);

  let ultimaCategoria = "";
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

  // Filtrar los productos por categoría
  const filtrarProductosPorCategoria = (categoria) => {
    return productos.filter((prod) => prod.categoria.nombre === categoria);
  };

  prodsBuscados && prodsBuscados.length > 0 && (productos = prodsBuscados);

  return (
    productos && (
      <main className="menuContainer">
        {categ === "todas" &&
          busqueda &&
          prodsBuscados.length !== productosState.length &&
          prodsBuscados.length > 0 && (
            <>
              <h1 className="resultados">
                Resultados de la búsqueda "{busqueda}":
              </h1>
              <button
                className="limpiarBusq"
                onClick={() => window.location.reload()}
              >
                Limpiar búsqueda
              </button>
            </>
          )}
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
              <div className="cardsVisibles">
                {productosSinSubcateg.map(
                  ({
                    nombre,
                    descripcion,
                    precio,
                    itemsExtra,
                    id,
                    cantidadPersonas,
                    subcategoria,
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
                      <p className="nombre">{nombre}</p>
                      <p className="descripcion">{descripcion}</p>
                      <div className="precioAcciones">
                        <div className="acciones">
                          {userActual ? (
                            <>
                              <Link
                                to={`/editarProducto?id=${id}`}
                                className="iconContainer1"
                              >
                                <HiOutlinePencil className="editarIcon" />
                              </Link>

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
                  <div className="cardsVisibles" key={subcategoria.id}>
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
                          >
                            {categ !== "todas" && esNuevaSubCategoria && (
                              <h1 className="nombreCateg">
                                {subcategoria.nombre}
                              </h1>
                            )}

                            {categ === "todas" &&
                              esNuevaSubCategoria &&
                              (prodsBuscados.length === 0 ||
                                prodsBuscados.length ===
                                  productosState.length) && (
                                <h1 className="nombreCateg">
                                  {subcategoria.nombre}
                                </h1>
                              )}
                            <div className="cardProducto">
                              <p className="nombre">{nombre}</p>
                              <p className="descripcion">{descripcion}</p>
                              <div className="precioAcciones">
                                <div className="acciones">
                                  {userActual ? (
                                    <>
                                      <Link
                                        to={`/editarProducto?id=${id}`}
                                        className="iconContainer1"
                                      >
                                        <HiOutlinePencil className="editarIcon" />
                                      </Link>

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

        {/********************* ITEMS NO VISIBLES *********************/}
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
                <div className="cardsVisibles">
                  {productosSinSubcateg.map(
                    ({
                      nombre,
                      descripcion,
                      precio,
                      itemsExtra,
                      id,
                      cantidadPersonas,
                      subcategoria,
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
                        <p className="nombre">{nombre}</p>
                        <p className="descripcion">{descripcion}</p>
                        <div className="precioAcciones">
                          <div className="acciones">
                            {userActual ? (
                              <>
                                <Link
                                  to={`/editarProducto?id=${id}`}
                                  className="iconContainer1"
                                >
                                  <HiOutlinePencil className="editarIcon" />
                                </Link>

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
                    <div className="cardsVisibles" key={subcategoria.id}>
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
                            >
                              {categ !== "todas" && esNuevaSubCategoria && (
                                <h1 className="nombreCateg">
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
                                <p className="nombre">{nombre}</p>
                                <p className="descripcion">{descripcion}</p>
                                <div className="precioAcciones">
                                  <div className="acciones">
                                    {userActual ? (
                                      <>
                                        <Link
                                          to={`/editarProducto?id=${id}`}
                                          className="iconContainer1"
                                        >
                                          <HiOutlinePencil className="editarIcon" />
                                        </Link>

                                        <button
                                          onClick={() =>
                                            handleClickEliminar(id)
                                          }
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
      </main>
    )
  );
}
