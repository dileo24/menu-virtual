import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { getPedidos } from "../../redux/actions";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatsProductos() {
  const pedidos = useSelector((state) => state.pedidos);
  const token = useSelector((state) => state.userActual.tokenSession);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPedidos(token));
  }, [dispatch, token]);

  // Cargando productos más vendidos
  let diezProdsMasVendidos = [];
  let productosVendidos = Array(10).fill(0);
  let pedPag = 0;

  pedidos.forEach((pedido) => {
    if (pedido.Estado.tipo === "Pagado") {
      pedPag += pedido.productos.length;

      pedido.productos.forEach((producto) => {
        const index = diezProdsMasVendidos.findIndex((p) => p === producto);
        if (index === -1) {
          diezProdsMasVendidos.push(producto);
        }
        const productIndex = diezProdsMasVendidos.findIndex(
          (p) => p === producto
        );
        productosVendidos[productIndex] += 1;
      });
    }
  });

  // Cargando estadísticas
  let miData = {
    labels: diezProdsMasVendidos,
    datasets: [
      {
        label: "Veces vendido",
        data: productosVendidos,
        borderColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#8BC34A",
          "#9C27B0",
          "#009688",
          "#FF5722",
          "#FFC107",
          "#607D8B",
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(139, 195, 74, 0.8)",
          "rgba(156, 39, 176, 0.8)",
          "rgba(0, 150, 136, 0.8)",
          "rgba(255, 87, 34, 0.8)",
          "rgba(255, 193, 7, 0.8)",
          "rgba(96, 125, 139, 0.8)",
        ],
      },
    ],
  };

  return (
    <div>
      <p style={{ margin: "2rem 0 0 0" }}>
        Productos vendidos en total: {pedPag}
      </p>
      <div className="statsPie">
        <Pie data={miData} />
      </div>
    </div>
  );
}
