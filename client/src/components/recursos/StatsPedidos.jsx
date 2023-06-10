import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  /* LineElement, */
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { getPedidos } from "../../redux/actions";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  /* LineElement, */
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function StatsPedidos() {
  const pedidos = useSelector((state) => state.pedidos);
  const token = useSelector((state) => state.userActual.tokenSession);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPedidos(token));
  }, [dispatch, token]);

  //cargando días del mes
  const obtenerDiasEnMes = (mes, año) => {
    return new Date(año, mes, 0).getDate();
  };
  const generarDiasDelMes = (mes, año) => {
    const numDias = obtenerDiasEnMes(mes, año);
    const dias = [];
    for (let dia = 1; dia <= numDias; dia++) {
      dias.push(dia);
    }
    return dias;
  };
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth() + 1;
  const añoActual = fechaActual.getFullYear();
  const diasDelMesActual = generarDiasDelMes(mesActual, añoActual);

  // cargando pedidosPagados
  let pedidosPagados = Array(diasDelMesActual.length).fill(0);
  let pedidosCancelados = Array(diasDelMesActual.length).fill(0);

  pedidos.forEach((pedido) => {
    const [dia, mes, año] = pedido.creacionFecha.split("/");
    const creacionFecha = new Date(`${mes}/${dia}/${año}`);

    const diaPedido = creacionFecha.getDate();

    if (diasDelMesActual.includes(diaPedido)) {
      const index = diasDelMesActual.indexOf(diaPedido);

      if (pedido.Estado.tipo === "Pagado") {
        pedidosPagados[index]++;
      } else if (pedido.Estado.tipo === "Cancelado") {
        pedidosCancelados[index]++;
      }
    }
  });
  console.log(pedidosCancelados);
  console.log(pedidosPagados);

  //cargando estadísticas
  let miData = {
    labels: diasDelMesActual,
    datasets: [
      //cada línea del gráfico
      {
        label: "Pedidos Pagados",
        data: pedidosPagados,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgb(255,99,132, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(255,99,132)",
        pointBackgroundColor: "rgba(255,99,132)",
      },
      {
        label: "Pedidos Cancelados",
        data: pedidosCancelados,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(61, 61, 206)",
        backgroundColor: "rgb(115,50,132, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(61, 61, 206)",
        pointBackgroundColor: "rgba(61, 61, 206)",
      },
    ],
  };
  let pedPag = pedidos.filter((ped) => ped.Estado.tipo === "Pagado");

  return (
    <div>
      <p>
        Pedidos totales PAGADOS
        {pedPag.length}
      </p>
      <div className="statsBar">
        {/* <Line data={miData} /> */}
        <Bar data={miData} />
      </div>
    </div>
  );
}
