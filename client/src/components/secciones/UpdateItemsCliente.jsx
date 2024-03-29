import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductos, editarItemsExtra } from "../../redux/actions";
import { Link, useParams, useNavigate } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";

export default function UpdateItemsCliente({
  setEditarItemProd,
  prodID,
  indexProd,
}) {
  const vertical = window.innerHeight > window.innerWidth;
  const navigate = useNavigate();
  const productosArray = useSelector((state) => state.home);
  const carrito = useSelector((state) => state.carrito);
  const itemsExtraState = useSelector((state) => state.itemsExtra);
  const dispatch = useDispatch();
  const { id, index } = useParams();
  const itemActual = carrito[vertical ? index : indexProd];
  let prod =
    productosArray &&
    productosArray.filter((p) => p.id === Number(vertical ? id : prodID));
  const [itemsExtraArray, setItemsExtraArray] = useState(itemActual.itemsExtra);
  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    dispatch(editarItemsExtra(vertical ? index : indexProd, itemsExtraArray));
    vertical ? navigate("/") : setEditarItemProd(false);
  };

  const handleSelectItemExtra = (item, personaIndex, categoriaIndex) => {
    const arrayItems = [...itemsExtraArray];
    const index = personaIndex * prod[0].itemsExtra.length + categoriaIndex;
    arrayItems[index] = item;
    setItemsExtraArray(arrayItems);
  };

  const elegirItemsMobile = document.querySelector(".elegirItemsMobile");
  if (elegirItemsMobile) {
    elegirItemsMobile.style.minHeight = `calc(${window.innerHeight}px)`;
  }

  return (
    <div className={vertical ? "elegirItemsMobile" : "elegirItemsPC"}>
      <div className="fondo">
        <div className="main">
          <div className="headerItems">
            {vertical ? (
              <Link to="/" className="atrasBtn">
                <span className="arrow-left"></span>
              </Link>
            ) : (
              <button
                className="atrasBtn"
                onClick={() => setEditarItemProd(false)}
              >
                <span className="arrow-left"></span>
              </button>
            )}
            <div className="titleHeaderItems">
              {`Edita los ítems extra de
                "${prod.length && prod[0].nombre}"`}
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
                          {prod[0].itemsExtra.map(
                            (categoria, categoriaIndex) => {
                              const itemsFiltrados = itemsExtraState.filter(
                                (item) => {
                                  if (item.categoria.nombre === categoria) {
                                    return true;
                                  }
                                  return (
                                    item.subcategoria &&
                                    item.subcategoria.nombre === categoria
                                  );
                                }
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
                                        personaIndex *
                                          prod[0].itemsExtra.length +
                                          categoriaIndex
                                      ]
                                    } // Set the value to the corresponding item from itemsExtraArray
                                  >
                                    <option hidden>
                                      {
                                        itemsExtraArray[
                                          personaIndex *
                                            prod[0].itemsExtra.length +
                                            categoriaIndex
                                        ]
                                      }
                                    </option>
                                    {itemsFiltrados.map((item, itemIndex) => (
                                      <option
                                        key={itemIndex}
                                        value={item.nombre}
                                      >
                                        {item.nombre}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="footer">
              <div
                to={"/adminCateg"}
                className="botonDescartar"
                onClick={() =>
                  vertical ? navigate("/") : setEditarItemProd(false)
                }
              >
                <VscTrash className="eliminarIcon" /> Cancelar
              </div>

              <button type="submit" className="botonFooter">
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
