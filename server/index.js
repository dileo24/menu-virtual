const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {
  fnRols,
  fnProducto,
  fnSuperAdmin,
  fnCategorias,
} = require("./src/loadDB.js");

conn.sync({ force: true }).then(async () => {
  server.listen(3001, async () => {
    await fnCategorias();
    await fnProducto();
    await fnRols();
    await fnSuperAdmin();
    console.log("%s listening at 3001");
  });
});
