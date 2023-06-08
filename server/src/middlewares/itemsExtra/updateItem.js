const { ItemExtra } = require("../../db");

const updateItem = async (req, res, next) => {
    try {
        const { nombre, imagen, descripcion, precio, itemsExtra, categoriaID, cantidadPersonas } =
            req.body;
        const id = req.params.id;
        const item = await ItemExtra.findByPk(id);
        if (item.lenght !== 0) {
            await ItemExtra.update(
                {
                    nombre: nombre || item.nombre,
                    precio: precio || item.precio,
                    descripcion: descripcion || item.descripcion,
                    imagen: imagen || item.imagen,
                    categoriaID: categoriaID || item.categoriaID,
                },
                { where: { id: id } }
            );
            req.body.resultado = {
                status: "200",
                respuesta: `El item ${nombre} se ha actualizado exitosamente`,
            };
            next();
        } else {
            throw new Error(`item con el ${id} no se ha encontrado`);
        }
    } catch (err) {
        console.log("error en updateItems");
        console.log(err);
        res.status(412).json({ resultado: err });
    }
};

module.exports = updateItem;
