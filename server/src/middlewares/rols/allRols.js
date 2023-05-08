const { Rol, Usuario, Op } = require("../../db");

const allRols = async (req, res, next) => {
    try{
        req.body.allRols = await Rol.findAll({include:Usuario, order: [["id","ASC"]]});
        console.log("All rols")
        next();
    }catch(err){
        console.log("error en allRol");
        res.status(404);
    }
}

module.exports = allRols;