import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductos, editarItemsExtra } from "../../redux/actions";
import { Link, useParams, useNavigate } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";
import Alerta from "../recursos/Alerta";

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
  const [alertaError, setAlertaError] = useState(false);

  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const cantItems =
      Number(prod && prod[0].cantidadPersonas) *
      Number(prod[0].itemsExtra.length);
    // Validación de itemsExtra seleccionados
    console.log(cantItems);
    console.log(itemsExtraArray.length);
    if (cantItems !== itemsExtraArray.length) {
      return setAlertaError({
        estadoActualizado: true,
        texto: `Debes seleccionar todos los items extra requeridos`,
      });
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
                        {prod[0].itemsExtra.map((categoria, categoriaIndex) => {
                          const itemsFiltrados = itemsExtraState.filter(
                            (item) => {
                              if (item.categoria.nombre === categoria) {
                                return true;
                              }
                              // Si el producto tiene subcategoría y coincide con la categoría actual, también se incluirá en el filtro.
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
                              {" "}
                              {/* Agregar key */}
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

          <div className="footer">
            <div
              to={"/adminCateg"}
              className="botonDescartar"
              onClick={() => navigate("/miPedido")}
            >
              <VscTrash className="eliminarIcon" /> Cancelar
            </div>

            <button type="submit" className="botonFooter">
              Aceptar
            </button>
          </div>
        </form>
      </div>
      {alertaError && (
        <Alerta
          tipo={"error"}
          titulo={"Error"}
          texto={alertaError.texto}
          estado={alertaError}
          setEstado={setAlertaError}
          callback={() => {}}
        />
      )}
    </div>
  );
}
