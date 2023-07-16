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
  SubcategEnCateg,
} = require("./src/loadDB.js");

const http = require("http");
const socketIO = require("socket.io");

app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("nuevoPedido", (pedido) => {
    socket.broadcast.emit("nuevoPedidoRecibido", pedido);
  });

  socket.on("cambiarEstadoPedido", (pedidoId, nuevoEstadoId) => {
    io.emit("estadoPedidoActualizado", pedidoId, nuevoEstadoId);
  });

  socket.on("disconnect", () => {});
});

conn.sync({ force: true }).then(async () => {
  server.listen(port, async () => {
    await fnCategorias();
    await fnSubcategorias();
    await SubcategEnCateg();
    await fnProducto();
    await fnRols();
    await fnUsuarios();
    await fnPagos();
    await fnEstado();
    await fnPedidos();
    console.log("%s listening at 3001");
  });
});
