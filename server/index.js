const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {
  fnRols,
  fnProducto,
  fnSuperAdmin,
  fnCategorias,
  fnPagos,
  fnEstado,
  fnPedidos,
} = require("./src/loadDB.js");

conn.sync({ force: true }).then(async () => {
  server.listen(3001, async () => {
    await fnCategorias();
    await fnProducto();
    await fnRols();
    await fnSuperAdmin();
    await fnPagos();
    await fnEstado();
    await fnPedidos();
    console.log("%s listening at 3001");
  });
});
