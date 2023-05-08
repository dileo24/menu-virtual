const { Router } = require('express');

const router = Router();

router.get('/', async(req,res)=>{
    console.log("home")
    return res.json({status:404, resultado: "ruta no encontrada en el backend"}) 
})

module.exports = router;