const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { fnProducto } = require("./src/loadDB.js");

conn.sync({ force: true }).then(async () => {
  server.listen(3001, async () => {
    await fnProducto();
    console.log("%s listening at 3001");
  });
});
