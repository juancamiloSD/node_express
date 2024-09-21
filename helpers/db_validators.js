const { Category, Role, User, Product } = require("../models")

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

const isCategory = async( id = "") => {

    const isCategory = await Category.findById( id )
    if ( !isCategory ){
        throw new Error(`El ID no existe ${ id }`)
    }
}

const isProduct = async( id = "") => {

    const isProduct = await Product.findById( id )
    if ( !isProduct ){
        throw new Error(`El ID no existe ${ id }`)
    }
}

module.exports = {
    isRoleValid,
    isEmail,
    isUserId,
    isCategory,
    isProduct
}