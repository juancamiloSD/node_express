const { Router } = require("express")
const { check } = require("express-validator")
const { login, googleAuth } = require("../controllers/auth.controller")
const { validarFields } = require("../middlewares/validateFields")

const router = Router()

router.post("/login", [
    check("email", "El correo es obligatorio!").isEmail(),
    check("password", "La contraseña es obligatoria!").not().isEmpty(),
    validarFields
], login)

router.post("/google", [
    check("id_token", "Token de google es obligatorio").not().isEmpty(),
    validarFields
], googleAuth)

module.exports = router