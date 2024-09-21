const { response } = require("express");
const { ObjectId } = require("mongoose").Types
const { User, Category, Product } = require("../models");
const category = require("../models/category");

const allowedCollections = [
    "users",
    "categories",
    "products",
    "categoryProduct",
    "roles"
]

const searchUser = async( term = "", res = response) => {
    const isMongoID = ObjectId.isValid(term);
    if(isMongoID){
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        })
    }

    const regex = new RegExp(term, "i")

    const users = await User.find({ 
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}]
     });

    res.json({
        results: users
    })
}

const searchCategory = async( term = "", res = response) => {
    const isMongoID = ObjectId.isValid(term);
    if(isMongoID){
        const category = await Category.findById(term);
        return res.json({
            results: (category) ? [category] : []
        })
    }

    const regex = new RegExp(term, "i")

    const categories = await Category.find({name: regex, status: true});

    res.json({
        results: categories
    })
}

const searchProduct = async( term = "", res = response) => {
    const isMongoID = ObjectId.isValid(term);
    if(isMongoID){
        const product = await Product.findById(term).populate("category", "name");
        return res.json({
            results: (product) ? [product] : []
        })
    }

    const regex = new RegExp(term, "i")

    const products = await Product.find({name: regex, status: true}).populate("category", "name");

    res.json({
        results: products
    })
}

const searchCategoryProduct = async( term = "", res = response) => {
    const isMongoID = ObjectId.isValid(term);
    if(isMongoID){
        const product = await Product.find({ category: term }).populate('category', 'name');
        return res.json({
            results: (product) ? [product] : []
        })
    }

    const regex = new RegExp(term, "i")

    const products = await Product.find({name: regex, status: true}).populate("category", "name");

    res.json({
        results: products
    })
}


const search = (req, res = response) => {

    const { collection, term } = req.params

    if( !allowedCollections.includes(collection) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${ allowedCollections }`
        })
    }

    switch (collection) {
        case "users":
            searchUser(term, res);
        break;
        case "categories":
            searchCategory(term, res);
        break;
        case "products":
            searchProduct(term, res);
        break;
        case "categoryProduct":
            searchCategoryProduct(term, res);
        break;
        default:
            res.status(500).json({
                msg: "Se le olvido hacer esta busqueda"
            })
        break;
    }
}

module.exports = {
    search
}