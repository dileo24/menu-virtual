import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Stats() {
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

  // Cargando ventas
  // cargando ventas
  let ventas = Array(diasDelMesActual.length).fill(0);

  pedidos.forEach((pedido) => {
    const [dia, mes, año] = pedido.creacionFecha.split("/");
    const creacionFecha = new Date(`${mes}/${dia}/${año}`);

    console.log(pedido.creacionFecha);
    const diaPedido = creacionFecha.getDate();

    if (diasDelMesActual.includes(diaPedido)) {
      const index = diasDelMesActual.indexOf(diaPedido);
      ventas[index]++;
    }
  });
  console.log(pedidos);
  console.log(ventas);

  //cargando estadísticas
  let miData = {
    labels: diasDelMesActual,
    datasets: [
      //cada línea del gráfico
      {
        label: "Ventas",
        data: ventas,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgb(255,99,132, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(255,99,132)",
        pointBackgroundColor: "rgba(255,99,132)",
      },
    ],
  };

  return (
    <div style={{ width: "700px", height: "400px" }}>
      <Line data={miData} />
    </div>
  );
}
