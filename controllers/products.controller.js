const { response, request } = require("express")
const User = require("../models/user")
const Product = require("../models/product")
const bcryptjs = require("bcryptjs")

const getProduct = async(req = request, res = response) => {

    const { limite = 5, from = 0 } = req.query
    const query = { status: true }

    // const users = await User.find(query)
    //     .skip(Number(from))
    //     .limit(Number(limite))

    // const count = await User.countDocuments(query)   
    
    const [ count, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate("user", "name")
            .populate("category", "name")
            .skip(Number(from))
            .limit(Number(limite))
    ])

    return res.json({
        count,
        products
        // count,
        // users   
    })
}

const getProductID = async(req, res = response) => {
    const { id } = req.params
    const product = await Product.findById( id )
        .populate("user", "name")
        .populate("category", "name")
    res.json( product )
}

const postProduct = async(req, res = response) => {

    const { status, userAuth, ...body } = req.body;
    const name = req.body.name.toUpperCase()
    const productDB = await Product.findOne({ name })

    if( productDB ){
        return res.status(400).json({
            msg: `El producto ${ productDB.name } ya existe`
        })
    }
    const data = {
        ...body,
        name,
        user: req.userAuth._id
    }

    const product = new Product( data )
    await product.save()

    return res.status(200).json(product)
}

const putProduct = async (req, res = response) => {
    const { id } = req.params
    const { userAuth, ...data } = req.body

    if( data.name ){
        data.name = data.name.toUpperCase()
    }

    data.userAuth = req.userAuth._id
    data.status = req.status

    const product = await Product.findByIdAndUpdate( id, data, { new: true } )

    return res.json({
        product,
    })
}  

const deleteProduct = async(req, res = response) => {

    const { id } = req.params

    const productDelete = await Product.findByIdAndUpdate(id, {status: false}, { new: true })
    return res.status(200).json({
        productDelete
    })
}  

module.exports = {
    getProduct,
    getProductID,
    putProduct,
    postProduct,
    deleteProduct
}