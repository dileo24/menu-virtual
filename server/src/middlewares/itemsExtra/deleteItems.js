const { ItemExtra } = require("../../db");

const deleteItems = async (req, res, next) => {
    try {
        const id = req.params.id;
        const itemExtra = await ItemExtra.findOne({ where: { id } });
        if (!itemExtra) {
            throw new Error(`No existe el itemExtra con el ID: ${id}`);
        } else if (itemExtra !== null || itemExtra.id > 0) {
            await ItemExtra.destroy({ where: { id: itemExtra.id } });
            req.body.resultado = {
                status: 200,
                respuesta: `El itemExtra ${itemExtra.nombre} ha sido eliminado`,
            };
            next();
        } else {
            throw new Error(`No existe el itemExtra con el ID: ${id}`);
        }
    } catch (err) {
        console.log("error en deleteProduct");
        console.log(err);
        req.body.resultado = { status: 404, respuesta: err.message };
        next();
    }
};

module.exports = deleteItems;
