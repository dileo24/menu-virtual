const { Rol, Op } = require("../../db");

const deleteRol = async (req, res, next) => {
    try{
        const id = req.param.id
        const rol = await Rol.findOne({where:{id}})
        if(!rol){
            throw new Error(`No existe el rol con el ID: ${id}`)
        }
        if(rol.id > 0){
            await Rol.destroy({where:{id:rol.id}});
            req.body.eliminado =  {status:200,resultado:`el Rol ${rol.rol} ah sido eliminado`};
            next();
        }else{
            throw new Error(`no existe el rol con esa ID: ${id}`)
        }
    }catch(err){
        console.log("error en deleteRol");
        console.log(err)
        req.body.eliminado = {status:200,resultado:err.message};
        next();
    }
}

module.exports = deleteRol;