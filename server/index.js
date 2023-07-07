const app = require("./src/app.js");
const cors = require("cors");
const port = process.env.PORT || 3001;
const { conn } = require("./src/db.js");
const {
  fnRols,
  fnProducto,
  fnUsuarios,
  fnCategorias,
  fnPagos,
  fnEstado,
  fnPedidos,
  fnSubcategorias,
} = require("./src/loadDB.js");

const http = require("http");
const socketIO = require("socket.io");

app.use(cors());
const server = http.createServer(app); // Crear servidor con app
const io = socketIO(server, {
  cors: {
    origin: "*", // O cambia "*" por la URL de tu cliente React
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Configura la comunicación con los clientes
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  // Maneja eventos personalizados enviados desde el cliente
  socket.on("cambiarEstadoPedido", (pedidoId, nuevoEstadoId) => {
    // Realiza las operaciones necesarias para cambiar el estado del pedido en la base de datos

    // Emitir el nuevo estado a todos los clientes conectados
    io.emit("estadoPedidoActualizado", pedidoId, nuevoEstadoId);
  });

  // Maneja la desconexión de un cliente
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

conn.sync({ force: true }).then(async () => {
  server.listen(port, async () => {
    await fnCategorias();
    await fnSubcategorias();
    await fnProducto();
    await fnRols();
    await fnUsuarios();
    await fnPagos();
    await fnEstado();
    await fnPedidos();
    console.log("%s listening at 3001");
  });
});
