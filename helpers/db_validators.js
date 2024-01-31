const Role = require("../models/role")
const User = require("../models/user")

const isRoleValid = async(role = "") => {
    const existRole = await Role.findOne({role})
    if( !existRole ){
        throw new Error(`El rol ${role} no esta registrado en la base de datos`)
    }
}

const isEmail = async( email = "" ) => {

    const hasEmail = await User.findOne({ email })
    if (hasEmail){
        throw new Error(`El correo ${email}, ya esta registrado`)
    }
}

const isUserId = async( id = "") => {

    const hasUser = await User.findById( id )
    if ( !hasUser ){
        throw new Error(`El ID no existe ${ id }`)
    }
}

module.exports = {
    isRoleValid,
    isEmail,
    isUserId
}