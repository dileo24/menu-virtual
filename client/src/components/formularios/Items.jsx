import React, { useEffect } from "react";
import Button from "../recursos/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductos } from "../../redux/actions";

export default function Items({
  itemsExtra,
  setItemsExtra,
  numItemsExtra,
  setNumItemsExtra,
}) {
  let productosState = useSelector((state) => state.home);
  const categorias = useSelector((state) => state.categorias);
  const subcategorias = useSelector((state) => state.subcategorias);
  const productosConItemTrue = productosState.filter(
    (producto) => producto.item === true
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  // Al cargar el componente, leer los datos desde el Local Storage
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("itemsExtra"));
    const savedNumItems = parseInt(localStorage.getItem("numItemsExtra"));

    if (savedItems && !isNaN(savedNumItems)) {
      setItemsExtra(savedItems);
      setNumItemsExtra(savedNumItems);
    }
  }, []);

  // Al actualizar los estados, guardar los datos en el Local Storage
  useEffect(() => {
    localStorage.setItem("itemsExtra", JSON.stringify(itemsExtra));
    localStorage.setItem("numItemsExtra", numItemsExtra);
  }, [itemsExtra, numItemsExtra]);
  const handleNumItemsChange = (e) => {
    let count = parseInt(e.target.value);
    setNumItemsExtra(count);
    setItemsExtra(Array(count).fill(""));
  };

  const handleItemChange = (e, index) => {
    const updatedItems = [...itemsExtra];
    updatedItems[index] = e.target.value;
    setItemsExtra(updatedItems);
  };

  const incrementNumItems = () => {
    let newNumItemsExtra = numItemsExtra;
    newNumItemsExtra++;
    setNumItemsExtra(newNumItemsExtra);
    let newItemsExtra = [...itemsExtra];
    for (let i = 0; i < newNumItemsExtra - itemsExtra.length; i++) {
      newItemsExtra.push("");
    }
    setItemsExtra(newItemsExtra);
  };

  const decrementNumItems = () => {
    if (numItemsExtra > 0) {
      setNumItemsExtra(numItemsExtra - 1);
      setItemsExtra(itemsExtra.slice(0, -1));
    }
  };

  /* const categoriasUnicas = Array.from(
    new Set(
      productosConItemTrue.map((producto) => {
        return producto.subcategoria
          ? producto.subcategoria.nombre
          : producto.categoria.nombre;
      })
    )
  ); */

  return (
    <>
      <div className="labelInput">
        <label htmlFor="numItemsExtra">
          Ítems Extra
          <span className="ml-2"> (no obligatorio)</span>
        </label>
        <div className="numItems">
          {numItemsExtra ? (
            <>
              <Button signo="-" funcion={decrementNumItems} />
              <p
                className="w-5 mx-3 text-center text-gray-700  font-medium leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleNumItemsChange}
                readOnly
              >
                {numItemsExtra}
              </p>
            </>
          ) : (
            ""
          )}

          <Button signo="+" funcion={incrementNumItems} />
        </div>
      </div>
      {numItemsExtra ? (
        <p className="info">
          Selecciona categorías o subcategorías para vincular sus productos
          guardados como ítems
        </p>
      ) : (
        ""
      )}

      {itemsExtra.map((item, index) => (
        <div className="labelInput " key={index}>
          <label className="item" htmlFor={`item${index}`}>
            ítem {index + 1}
          </label>
          <select
            className="itemInput"
            onChange={(e) => handleItemChange(e, index)}
          >
            <option hidden>
              {itemsExtra[index] === ""
                ? "Selecciona una categoría"
                : itemsExtra[index]}
            </option>

            {/* {categoriasUnicas.map((nombre, index) => (
              <option key={index} value={nombre}>
                {nombre}
              </option>
            ))} */}

            {/* Mapear las opciones de categorías */}
            {categorias.map((categoria) => {
              const categoriaEstaEnProductos = productosConItemTrue.some(
                (producto) => producto.categoria.id === categoria.id
              );

              if (categoriaEstaEnProductos) {
                return (
                  <option key={categoria.id} value={categoria.nombre}>
                    {categoria.nombre}
                  </option>
                );
              }
              return null;
            })}

            {/* Mapear las opciones de subcategorías */}
            {subcategorias.map((subcategoria) => {
              const subcategoriaEstaEnProductos = productosConItemTrue.some(
                (producto) =>
                  producto.subcategoria &&
                  producto.subcategoria.id === subcategoria.id
              );

              if (subcategoriaEstaEnProductos) {
                return (
                  <option key={subcategoria.id} value={subcategoria.nombre}>
                    {subcategoria.nombre}
                  </option>
                );
              }
              return null;
            })}
          </select>
        </div>
      ))}
    </>
  );
}
