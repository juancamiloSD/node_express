const { Router } = require("express")
const { check } = require("express-validator")

const { validarFields, validateJWT, hasRole, validateRoleAdmin } = require("../middlewares")

const { isRoleValid, isEmail, isUserId, isProduct, isCategory } = require("../helpers/db_validators")
const { deleteProduct, putProduct, postProduct, getProduct, getProductID } = require("../controllers/products.controller")

const router = Router()

router.get("/", getProduct)

router.get("/:id", [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(isProduct),
    validarFields,
], getProductID)

router.post("/", [
    validateJWT,
    check("name", "El nombre es obligatorio!").not().isEmpty(),
    check("description", "La descripción es obligatoria!").not().isEmpty(),
    check("category", "No es un ID valido!").isMongoId(),
    check("category").custom( isCategory ),
    validarFields
], postProduct)

router.put("/:id", [
    validateJWT,
    check("category", "No es un ID valido!").isMongoId(),
    check("id").custom( isProduct ),
    validarFields
], putProduct)

router.delete("/:id", [
    validateJWT,
    validateRoleAdmin,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom( isProduct ),
    validarFields
], deleteProduct)

module.exports = router