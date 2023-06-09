const { ItemExtra } = require("../../db");

const findItemByID = async (req, res, next) => {
    try {
        const id = req.params.id;
        req.body.itemById = await ItemExtra.findOne({ where: { id } });
        next();
    } catch (err) {
        console.log("error en findItemByID");
        console.log(err.message);
        req.body.itemById = { status: 404, resultado: err.message };
    }
};

module.exports = findItemByID;
