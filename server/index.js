const server = require("./src/app.js");
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
} = require("./src/loadDB.js");

conn.sync({ force: true }).then(async () => {
  server.listen(port, async () => {
    await fnCategorias();
    await fnProducto();
    await fnRols();
    await fnUsuarios();
    await fnPagos();
    await fnEstado();
    await fnPedidos();
    console.log("%s listening at 3001");
  });
});
