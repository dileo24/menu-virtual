const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {
  fnRols,
  fnProducto,
  fnSuperAdmin,
  fnCategorias,
  fnPagos,
  fnEstado,
} = require("./src/loadDB.js");

conn.sync({ force: true }).then(async () => {
  server.listen(3001, async () => {
    await fnCategorias();
    await fnProducto();
    await fnRols();
    await fnPagos();
    await fnSuperAdmin();
    await fnEstado();
    console.log("%s listening at 3001");
  });
});
