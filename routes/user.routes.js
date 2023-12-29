const { Router } = require("express")
const { getUser, putUser, postUser, deleteUser } = require("../controllers/user.controller")

const router = Router()

router.get("/", getUser)
router.put("/", putUser)
router.post("/:id", postUser)
router.delete("/", deleteUser)

module.exports = router