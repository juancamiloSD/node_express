const { Router } = require("express")
const { check } = require("express-validator")
const { validarFields, validateFile } = require("../middlewares")
const { addFiles, updateImage, getImages, updateImageCloudinary } = require("../controllers/uploads.controller")
const { isCollectionValid } = require("../helpers")

const router = Router()

router.post("/", validateFile, addFiles);

router.put("/:collection/:id", [ 
    validateFile,
    check("id", "El Id no es válida").isMongoId(),
    check("collection").custom( c => isCollectionValid(c, ["users", "products"])),
    validarFields,
// ], updateImage);
], updateImageCloudinary);

router.get("/:collection/:id", [
    check("id", "El Id no es válida").isMongoId(),
    check("collection").custom( c => isCollectionValid(c, ["users", "products"])),
    validarFields,
], getImages);

module.exports = router;