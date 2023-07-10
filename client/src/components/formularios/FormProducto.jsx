import React, { useEffect } from "react";
import Header from "../secciones/Header";
import Items from "./Items";
import { useDispatch, useSelector } from "react-redux";
import { getCategorias, getSubcategorias } from "../../redux/actions";
// import { func } from "prop-types";

export default function FormProducto({
  titulo,
  nombre,
  cantidadPersonas,
  setCantidadPersonas,
  setNombre,
  descripcion,
  setDescripcion,
  precio,
  setPrecio,
  onSubmit,
  itemsExtra,
  setItemsExtra,
  numItemsExtra,
  setNumItemsExtra,
  categoriaID,
  setCategoriaID,
  subcategoriaID,
  setSubcategoriaID,
  listado,
  setListado,
  mostrarPersonaItem,
  setMostrarPersonaItem,
  mostrarOtroCheckbox,
  setMostrarOtroCheckbox,
  mostrarPrecio,
  setMostrarPrecio,
  item,
  setItem,
  // checkListadoTrue,
  // checkListadoFalse,
}) {
  const dispatch = useDispatch();

  const itemsExtraArray = useSelector((state) => state.itemsExtra);
  const categorias = useSelector((state) => state.categorias);
  const subcategorias = useSelector((state) => state.subcategorias);
  // const categActual = categorias.filter((categ) => categ.id === categoriaID);

  useEffect(() => {
    dispatch(getCategorias());
    dispatch(getSubcategorias());
    if (categoriaID === "2" || categoriaID === "1") {
      setListado(true);
      setMostrarOtroCheckbox(false);
      setMostrarPersonaItem(true);
    }
  }, [
    dispatch,
    categoriaID,
    setListado,
    setMostrarOtroCheckbox,
    setMostrarPersonaItem,
  ]);

  return (
    <div className="min-h-100 bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Header />
        <div className="flex flex-col justify-center h-screen bg-gray-200 md:w-4/5  xl:w-4/5">
          <h2 className="titulo -mt-16 text-3xl font-light text-center">
            {!titulo ? "Editar Producto" : titulo}
          </h2>
          <div className="flex flex-col mt-10 items-center contenedor">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-10/12 md:w-8/12 lg:w-6/12">
              <div className=" shadow overflow-hidden sm:rounded-lg border-b border-gray-200 ">
                <form id="formulario" className="bg-white p-3" method="POST">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Categoría
                    </label>
                    <select
                      className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) => {
                        setCategoriaID(e.target.value);
                        setMostrarPrecio(true);
                        setPrecio("");
                      }}
                      value={categoriaID || ""} // Establece el valor seleccionado en base a la variable de estado categoriaID
                    >
                      <option value="" hidden>
                        Elegí una categoría
                      </option>

                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  {subcategorias &&
                    subcategorias.some(
                      (subC) =>
                        Number(subC.categoria.id) === Number(categoriaID)
                    ) && (
                      <select
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setSubcategoriaID(e.target.value)}
                        value={subcategoriaID}
                      >
                        <option hidden>Subcategoria (no obligatorio)</option>
                        {subcategorias.map(
                          (subC) =>
                            Number(subC.categoria.id) ===
                              Number(categoriaID) && (
                              <option key={subC.id} value={subC.id}>
                                {subC.nombre}
                              </option>
                            )
                        )}
                      </select>
                    )}

                  <div className="flex mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="nombre"
                    >
                      Guardar como ítem
                    </label>
                    <p className="ml-2 mr-1">No</p>
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      checked={mostrarPersonaItem}
                      onChange={() => {
                        setMostrarPersonaItem(true);
                        setMostrarOtroCheckbox(false);
                        setListado(true);
                        setItem(false);
                      }}
                    />
                    <p className="mr-1">Sí</p>
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      checked={mostrarOtroCheckbox}
                      onChange={() => {
                        setMostrarOtroCheckbox(true);
                        setCantidadPersonas(1);
                        setMostrarPersonaItem(false);
                        setNumItemsExtra(0);
                        setItemsExtra([]);
                        setItem(true);
                      }}
                    />

                    {mostrarOtroCheckbox && (
                      <>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 ml-5"
                          htmlFor="nombre"
                        >
                          Mostrar en el Menú
                        </label>
                        <p className="ml-2 mr-1">No</p>
                        <input
                          className="mr-2 leading-tight"
                          type="checkbox"
                          checked={listado === false ? true : false}
                          onChange={() => {
                            setListado(false);
                            // Ocultar precio:
                            setMostrarPrecio(false);
                            setPrecio(0);
                          }}
                        />
                        <p className=" mr-1">Sí</p>
                        <input
                          className="mr-2 leading-tight"
                          type="checkbox"
                          checked={listado === true ? true : false}
                          onChange={() => {
                            setListado(true);
                            // Mostrar precio
                            setMostrarPrecio(true);
                            setPrecio("");
                          }}
                        />
                      </>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="nombre"
                    >
                      Nombre
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="nombre"
                      name="nombre"
                      type="text"
                      placeholder="Nombre del producto"
                      value={nombre}
                      maxLength={150}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="descripcion"
                    >
                      Descripción
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="descripcion"
                      name="descripcion"
                      type="text"
                      placeholder="Descripción del producto"
                      value={descripcion}
                      maxLength={150}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </div>

                  {mostrarPrecio && listado && (
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="precio"
                      >
                        Precio
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="precio"
                        name="precio"
                        type="number"
                        placeholder="Precio del producto"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                      />
                    </div>
                  )}

                  <input type="hidden" name="id" id="id" value="" />

                  {mostrarPersonaItem && (
                    <>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="cantidadPersonas"
                        >
                          Para cuántas personas será el combo
                        </label>
                        <input
                          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="cantidadPersonas"
                          name="cantidadPersonas"
                          type="number"
                          placeholder="Para cuántas personas será el combo"
                          value={cantidadPersonas}
                          onChange={(e) => setCantidadPersonas(e.target.value)}
                        />
                      </div>
                      <Items
                        itemsExtra={itemsExtra}
                        setItemsExtra={setItemsExtra}
                        numItemsExtra={numItemsExtra}
                        setNumItemsExtra={setNumItemsExtra}
                        itemsExtraArray={itemsExtraArray}
                        categoriaID={categoriaID}
                      />
                    </>
                  )}

                  <input
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-900 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer"
                    value={
                      titulo === "Nuevo Producto"
                        ? "Crear Producto"
                        : "Guardar cambios"
                    }
                    onClick={onSubmit}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    /* ) */
  );
}
