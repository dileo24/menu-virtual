import React, { useEffect } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import Filtros from "../recursos/Filtros";
import {
  getEstados,
  getPedidos,
  getTipoPago,
  updatePedido,
} from "../../redux/actions";

export default function Pedidos() {
  const pedidos = useSelector((state) => state.pedidos);
  const estados = useSelector((state) => state.estados);
  const tipoPagos = useSelector((state) => state.tipoPagos);
  const token = useSelector((state) => state.userActual.tokenSession);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPedidos(token));
    dispatch(getEstados());
    dispatch(getTipoPago());
    // Cambiarle el background del botón del Header
    const pedidos = document.querySelector(".pedidos");
    pedidos.classList.add("bg-teal-700");

    // Actualizar en tiempo real el servidor (sin necesidad de recargar la página)
    const pollServer = async () => {
      while (true) {
        // Realizar la petición al servidor para obtener los pedidos actualizados
        await dispatch(getPedidos(token));
        // Esperar un tiempo antes de hacer la siguiente petición (por ejemplo, cada 5 segundos)
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    };
    pollServer();
    return () => {
      // Código para detener el polling si es necesario
    };
  }, [dispatch, token]);

  const handleSelectChange = (e, id, atributo) => {
    const value = e.target.value;
    const data = { [atributo]: value };
    let res = window.confirm(`Está seguro de querer modificar este pedido"?`);
    if (res === true) {
      dispatch(updatePedido(id, data, token));
    }
  };
  return (
    pedidos && (
      <div id="productos" className="min-h-100 bg-gray-200">
        <div className="md:flex min-h-screen md:align-top">
          <Header />
          <main className="md:w-4/5 xl:w-4/5  py-10 bg-gray-200">
            <h2 className="text-3xl font-light text-center">
              Planilla de Pedidos
            </h2>
            <div className="px-5 flex flex-col mt-10">
              <Filtros />
              <div className="py-2 overflow-x-auto">
                <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                          Productos
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                          Mesa
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                          Precio
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                          Tipo de Pago
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {pedidos.map(
                        ({
                          productos,
                          mesa,
                          aclaraciones,
                          precio,
                          Estado,
                          itemsExtra,
                          creacionFecha,
                          creacionHora,
                          Pago,
                          id,
                        }) => (
                          <tr key={id}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <p className="text-sm leading-5 font-medium text-gray-700 text-lg font-bold">
                                {productos.join(", ")}
                              </p>
                              {itemsExtra && (
                                <p className="text-gray-700 mt-2">
                                  <b>Extra:</b> {itemsExtra.join(", ")}
                                </p>
                              )}
                              <p className="text-gray-700 mt-2">
                                <b> Aclaraciones:</b> {aclaraciones}
                              </p>
                              <p className="text-gray-700 mt-2">
                                <b> Realizado el:</b>{" "}
                                {creacionFecha + " a las " + creacionHora}
                              </p>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <p className="text-gray-700">{mesa}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700">
                              <p className="text-gray-600">${precio}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                              <select
                                id=""
                                value={Estado.id}
                                onChange={(e) =>
                                  handleSelectChange(e, id, "estadoID")
                                }
                              >
                                {estados.map((est) => (
                                  <option key={est.id} value={est.id}>
                                    {est.tipo}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                              <select
                                id=""
                                value={Pago.id}
                                onChange={(e) =>
                                  handleSelectChange(e, id, "tipoPagoID")
                                }
                              >
                                {tipoPagos.map((pag) => (
                                  <option key={pag.id} value={pag.id}>
                                    {pag.tipo}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  );
}
