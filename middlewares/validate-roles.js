const { response, request } = require("express")

const validateRoleAdmin = async(req = request, res = response, next) => {

   if( !req.userAuth ){
        return res.status(500).json({
            msg: "Rol no valido!"
        })
   }

   const { role, name } = req.userAuth

   if( role !== "ADMIN" ){
        return res.status(401).json({
            msg: `${ name } no es administrador`
        })
   }
    
   next()
}

const hasRole = ( ...roles ) => {

    return (req = request, res = response, next) => {
        
        if( !req.userAuth ){
            return res.status(500).json({
                msg: "Rol no valido!"
            })
       }
       if( !roles.includes( req.userAuth.role ) ){
            return res.status(401).json({
                msg: `El usuario no incluye uno de estos roles permitidos ${roles}`
            })
       }
        next()
    }
 }

module.exports = {
    validateRoleAdmin,
    hasRole
}