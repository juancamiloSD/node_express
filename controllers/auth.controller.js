const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async(req, res = response) => {

    const { email, password } = req.body
    
    try {
        
        const user = await User.findOne({ email })
        console.log(user)
        if( !user ){
            return res.status(400).json({
                msg: "Usuario y/o password no son correctos"
            })
        }

        if( !user.status ){
            return res.status(400).json({
                msg: "Usuario y/o password no son correctos - Estado: false"
            })
        }

        const validPass = bcryptjs.compareSync(password, user.password)
        if( !validPass ){
            return res.status(400).json({
                msg: "Usuario y/o password no son correctos - Password"
            })
        }

        const token = await generateJWT( user.id )
        res.json({
            user,
            token
        })

       
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}

module.exports = {
    login
}