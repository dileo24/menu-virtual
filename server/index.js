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
const server = http.createServer(app); 
const io = socketIO(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  // eventos desde el cliente
  socket.on("cambiarEstadoPedido", (pedidoId, nuevoEstadoId) => {
    
    // nuevo estado
    io.emit("estadoPedidoActualizado", pedidoId, nuevoEstadoId);
  });

  // desconexión de un cliente
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
