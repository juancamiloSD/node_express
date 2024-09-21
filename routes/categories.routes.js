const { Router } = require("express")
const { check } = require("express-validator")
const { validateJWT, validarFields, validateRoleAdmin } = require("../middlewares")
const { getCategories, 
        getCategoryID, 
        createCategory, 
        updateCategory, 
        deleteCategory
    } = require("../controllers/categories.controller")
const { isCategory } = require("../helpers/db_validators")
const router = Router()

router.get("/", getCategories)

router.get("/:id", [
    check("id", "No es un ID de mongo valido").isMongoId(),
    check("id").custom(isCategory),
    validarFields,
], getCategoryID)

router.post("/", [
    validateJWT, 
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validarFields
], createCategory)

router.put("/:id", [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(isCategory),
    validarFields
], updateCategory)

router.delete("/:id", [ 
    validateJWT,
    validateRoleAdmin,
    check("id", "No es un ID de mongo valido").isMongoId(),
    check("id").custom(isCategory),
    validarFields,
], deleteCategory)

module.exports = router