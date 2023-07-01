import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductos, agregarCarrito } from "../../redux/actions";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Items() {
  const navigate = useNavigate();
  const productosArray = useSelector((state) => state.home);
  const itemsExtraState = useSelector((state) => state.itemsExtra);
  const dispatch = useDispatch();
  const { id } = useParams();
  let prod =
    productosArray && productosArray.filter((p) => p.id === Number(id));

  const [itemsExtraArray, setItemsExtraArray] = useState([]);

  const handleIncremento = (prod, itemsExtraArray) => {
    dispatch(
      agregarCarrito({
        nombre: prod[0].nombre,
        descripcion: prod[0].descripcion,
        precio: prod[0].precio,
        id: prod[0].id,
        itemsExtra: itemsExtraArray,
        cantidadPersonas: prod[0].cantidadPersonas,
      })
    );
  };

  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const cantItems =
      Number(prod && prod[0].cantidadPersonas) *
      Number(prod[0].itemsExtra.length);
    console.log();
    // Validación de itemsExtra seleccionados
    if (cantItems !== itemsExtraArray.length) {
      alert("Debes seleccionar todos los items extra requeridos");
    }
    handleIncremento(prod && prod, itemsExtraArray);
    navigate("/");
  };

  const handleSelectItemExtra = (item, personaIndex, categoriaIndex) => {
    const newItem = item;

    const updatedItemsExtraArray = [...itemsExtraArray];
    updatedItemsExtraArray[personaIndex] = newItem;

    setItemsExtraArray(updatedItemsExtraArray);
  };

  return (
    <>
      <div>
        <Link to="/" className="editarItems">
          <b className="">Atrás</b>
        </Link>

        <form id="formulario" onSubmit={(e) => handleSubmitForm(e)}>
          {/* ****** ITEMS ****** */}
          <div className="">
            <div className="flex">
              {prod.length && (
                <div key={prod[0].id}>
                  <label className="" htmlFor="mesa">
                    Seleccione items para {prod[0].nombre}
                  </label>
                  {Array.from(
                    { length: prod[0].cantidadPersonas },
                    (_, personaIndex) => (
                      <div key={personaIndex}>
                        <p>Persona {personaIndex + 1}</p>
                        {prod[0].itemsExtra.map((categoria, categoriaIndex) => {
                          const itemsFiltrados = itemsExtraState.filter(
                            (item) => item.categoria.nombre === categoria
                          );
                          return (
                            <select
                              name={`itemsExtra-${personaIndex}-${categoriaIndex}`} // Cambio: Utilizar índices en el nombre del selector
                              onChange={
                                (e) =>
                                  handleSelectItemExtra(
                                    e.target.value,
                                    personaIndex,
                                    categoriaIndex
                                  ) // Cambio: Pasar los índices del selector
                              }
                              required
                              key={`${personaIndex}-${categoriaIndex}`}
                            >
                              <option hidden>{categoria}</option>
                              {itemsFiltrados.map((item, itemIndex) => (
                                <option key={itemIndex} value={item.nombre}>
                                  {item.nombre}
                                </option>
                              ))}
                            </select>
                          );
                        })}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="footerItems">
            <div className="listoBtn">
              <input type="submit" className="verPedido" value="Listo" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
