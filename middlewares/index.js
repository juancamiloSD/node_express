const validarFields = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-roles");
const validateFile = require("../middlewares/validateFile");

module.exports = {
    ...validarFields,
    ...validateJWT,
    ...validateRoles,
    ...validateFile
}