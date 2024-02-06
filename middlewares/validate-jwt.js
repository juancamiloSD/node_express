const { response, request } = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const validateJWT = async(req = request, res = response, next) => {

    const token = req.header("x-token")
    if( !token ){
        return res.status(401).json({
            msg: "No hay token"
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY)

        const userAuth = await User.findById( uid )

        if( !userAuth ){
            return res.status(401).json({
                msg: "Usuario no existe!"
            })
        }

        if( !userAuth.status ){
            return res.status(401).json({
                msg: "Usuario deshabilitado"
            })
        }

        req.userAuth = userAuth
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: "Token no válido!"
        })
    }
    
}

module.exports = {
    validateJWT
}