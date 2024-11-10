const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product} = require("../models");

const addFiles = async(req, res = response) => {

    try {
        const name = await uploadFile(req.files, undefined, "images");
        res.json({ name });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const updateImage = async(req, res = response) => {

    const { collection, id } = req.params;

    let model;
    
    switch (collection) {
        case "users":
            model = await User.findById(id);
            if(!model) return res.status(400).json({ msg: `No existe el usuario con el id: ${id}` });
        break;
        case "products":
            model = await Product.findById(id);
            if(!model) return res.status(400).json({ msg: `No existe el producto con el id: ${id}` });
        break;
        default:
            return res.status(500).json({ msg: "No se puede actualizar el modelo." });
    }

    if( model.img ) {
        const pathImg = path.join(__dirname, "../uploads/", collection, model.img);
        model.img = pathImg;
        if( fs.existsSync(pathImg) ) {
            fs.unlinkSync(pathImg);
        }
    }

    const name = await uploadFile(req.files, undefined, collection);
    model.img = name;

    await model.save();

    res.json(model);
}

const updateImageCloudinary = async(req, res = response) => {

    const { collection, id } = req.params;

    let model;
    
    switch (collection) {
        case "users":
            model = await User.findById(id);
            if(!model) return res.status(400).json({ msg: `No existe el usuario con el id: ${id}` });
        break;
        case "products":
            model = await Product.findById(id);
            if(!model) return res.status(400).json({ msg: `No existe el producto con el id: ${id}` });
        break;
        default:
            return res.status(500).json({ msg: "No se puede actualizar el modelo." });
    }

    if( model.img ) {
        const nameSplit = model.img.split("/");
        const name = nameSplit[nameSplit.length - 1];
        const [ public_id ] = name.split(".");
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.img = secure_url;

    await model.save();

    res.json(model);
}

const getImages = async(req, res = response) => {
    const { collection, id } = req.params;
    let model;
    
    switch (collection) {
        case "users":
            model = await User.findById(id);
            if(!model) return res.status(400).json({ msg: `No existe el usuario con el id: ${id}` });
        break;
        case "products":
            model = await Product.findById(id);
            if(!model) return res.status(400).json({ msg: `No existe el producto con el id: ${id}` });
        break;
        default:
            return res.status(500).json({ msg: "No se puede actualizar el modelo." });
    }

    if( model.img ) {
        const pathImg = path.join(__dirname, "../uploads/", collection, model.img);
        if( fs.existsSync(pathImg) ) {
            return res.sendFile(pathImg);
        }
    }
    
    const pathImgNone = path.join(__dirname, "../assets/no-image.jpg");
    return res.sendFile(pathImgNone);
}

module.exports = {
    addFiles,
    updateImage,
    getImages,
    updateImageCloudinary
}