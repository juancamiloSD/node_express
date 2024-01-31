const { validationResult } = require("express-validator")

const validarFields = ( req, res, next ) => {
    const errors = validationResult(req)
    if( !errors.isEmpty() ){
        return res.status(400).json(errors)
    }

    next()
}

module.exports = {
    validarFields
}