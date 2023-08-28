const fs = require("fs");
const path = require("path");

const { Producto, Categoria, Subcategoria } = require("../../db");

const createProduct = async (req, res, next) => {
  try {
    const {
      nombre,
      descripcion,
      precio,
      item,
      listado,
      itemsExtra,
      categoriaID,
      subcategoriaID,
      cantidadPersonas,
      mostrarPersonaItem,
      mostrarOtroCheckbox,
      combo,
    } = req.body;

    console.log(nombre);

    const imagen = req.file;

    /*   if (typeof nombre !== "string" || nombre === undefined) {
      throw new Error(
        `El Nombre del Producto debe ser únicamente texto, y has insertado ${
          nombre === undefined ? "texto vacío" : nombre
        }`
      );
    } */

    const categoria = await Categoria.findByPk(categoriaID);
    let newProductData = {
      nombre,
      descripcion,
      precio,
      listado,
      itemsExtra,
      item,
      cantidadPersonas,
      mostrarPersonaItem,
      mostrarOtroCheckbox,
      combo,
    };

    if (imagen) {
      // guardar archivo y obtener su url
      const imgPath = path.join(__dirname, "./imgs");
      const imgName = `${Date.now()}_${imagen.originalname}`;
      const imgUrl = path.join(imgPath, imgName);

      // mandar archivo al servidor
      fs.writeFileSync(imgUrl, imagen.buffer);

      newProductData.imagen = imgUrl;
    }

    const newProduct = await Producto.create(newProductData);

    await categoria.addProducto(newProduct);

    if (subcategoriaID) {
      const subcategoria = await Subcategoria.findByPk(subcategoriaID);
      await subcategoria.addProducto(newProduct);
    }

    req.body.resultado = {
      status: "200",
      respuesta: `El producto ${nombre} se ha creado exitosamente`,
    };

    next();
  } catch (err) {
    console.log("Error en createProduct");
    console.log(err.message);
    req.body.resultado = { status: "404", respuesta: err.message };
    console.log(req.body.resultado);
    next();
  }
};

module.exports = createProduct;
