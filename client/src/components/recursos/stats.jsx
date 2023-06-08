import React from "react";
import { Line } from "react-chartjs-2";

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
import { useSelector } from "react-redux";

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

let ventas = [0, 20, 34, 14, 54, 98, 150, 50, 12, 15, 32, 45];
let meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

let miData = {
  labels: meses,
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

let misOptions = {};

export default function Stats() {
  const pedidos = useSelector((state) => state.pedidos);
  const pedidosPagados = pedidos.filter(
    (pedido) => pedido.Estado.tipo === "Pagado"
  );

  return (
    <div style={{ width: "700px", height: "400px" }}>
      <Line data={miData} options={misOptions} />
    </div>
  );
}
