import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductos, editarItemsExtra } from "../../redux/actions";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function UpdateItemsCliente() {
  const navigate = useNavigate();
  const productosArray = useSelector((state) => state.home);
  const carrito = useSelector((state) => state.carrito);
  const itemsExtraState = useSelector((state) => state.itemsExtra);
  const dispatch = useDispatch();
  const { id, index } = useParams();
  const itemActual = carrito[index];
  let prod =
    productosArray && productosArray.filter((p) => p.id === Number(id));

  const [itemsExtraArray, setItemsExtraArray] = useState(itemActual.itemsExtra);

  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const cantItems =
      Number(prod && prod[0].cantidadPersonas) *
      Number(prod[0].itemsExtra.length);
    // Validación de itemsExtra seleccionados
    if (cantItems !== itemsExtraArray.length) {
      return alert("Debes seleccionar todos los items extra requeridos");
    }
    dispatch(editarItemsExtra(index, itemsExtraArray));
    navigate("/");
  };

  const handleSelectItemExtra = (item, personaIndex, categoriaIndex) => {
    const arrayItems = [...itemsExtraArray];
    const index = personaIndex * prod[0].itemsExtra.length + categoriaIndex;
    arrayItems[index] = item;
    setItemsExtraArray(arrayItems);
  };
  return (
    <div className="elegirItemsCont">
      <div className="scrollable-content">
        <div className="headerItems">
          <Link to="/miPedido" className="atrasBtn">
            <span className="arrow-left"></span>
          </Link>
          <div className="titleHeaderItems">
            {prod.length && <p>{prod[0].nombre}</p>}
          </div>
        </div>

        <form
          id="formulario"
          className="formulario"
          onSubmit={(e) => handleSubmitForm(e)}
        >
          {/* ** ITEMS ** */}
          <div className="">
            <div className="">
              {prod.length && (
                <div key={prod[0].id}>
                  <div className="precio">${prod[0].precio}</div>
                  <div className="descripcion">{prod[0].descripcion}</div>
                  {Array.from(
                    { length: prod[0].cantidadPersonas },
                    (_, personaIndex) => (
                      <div key={personaIndex} className="cardItemCont">
                        <p className="persona">Persona {personaIndex + 1}</p>
                        {prod[0].itemsExtra.map((categoria, categoriaIndex) => {
                          const itemsFiltrados = itemsExtraState.filter(
                            (item) => item.categoria.nombre === categoria
                          );
                          return (
                            <div
                              className="cardItem"
                              key={`${personaIndex}-${categoriaIndex}`}
                            >
                              <p className="categItem">{categoria}</p>
                              <select
                                className="select"
                                name={`itemsExtra-${personaIndex}-${categoriaIndex}`}
                                onChange={(e) =>
                                  handleSelectItemExtra(
                                    e.target.value,
                                    personaIndex,
                                    categoriaIndex
                                  )
                                }
                                required
                                value={
                                  itemsExtraArray[
                                    categoriaIndex +
                                      personaIndex * prod[0].itemsExtra.length
                                  ]
                                }
                              >
                                <option hidden>Seleccionar</option>
                                {itemsFiltrados.map((item, itemIndex) => (
                                  <option key={itemIndex} value={item.nombre}>
                                    {item.nombre}
                                  </option>
                                ))}
                              </select>
                            </div>
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
              <input type="submit" className="submit" value="Aceptar" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
