const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { fnRols, fnProducto } = require("./src/loadDB.js");

conn.sync({ force: true }).then(async () => {
  server.listen(3001, async () => {
    await fnProducto();
    await fnRols();
    console.log("%s listening at 3001");
  });
});
