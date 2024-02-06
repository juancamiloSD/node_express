const validarFields = require("../middlewares/validateFields")
const validateJWT = require("../middlewares/validate-jwt")
const validateRoles = require("../middlewares/validate-roles")

module.exports = {
    ...validarFields,
    ...validateJWT,
    ...validateRoles
}