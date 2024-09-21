const { response, request } = require("express");

const { Category } = require("../models");
const category = require("../models/category");


const getCategories = async(req, res = response) => {
    const { limite = 5, from = 0 } = req.query
    const query = { status: true }

    // const users = await User.find(query)
    //     .skip(Number(from))
    //     .limit(Number(limite))

    // const count = await User.countDocuments(query)   
    
    const [ count, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .populate("user", "name")
        .skip(Number(from))
        .limit(Number(limite))
    ])

    res.json({
        count,
        categories
        // count,
        // users   
    })
}

const getCategoryID = async(req, res = response) => {
    const { id } = req.params
    const category = await Category.findById( id ).populate("user", "name")
    res.json( category )
}

const createCategory = async(req = request, res = response) => {

    const name = req.body.name.toUpperCase()
    const categoryDB = await Category.findOne({ name })

    if( categoryDB ){
        return res.status(400).json({
            msg: `La categoría ${ categoryDB.name } ya existe`
        })
    }
    const data = {
        name,
        user: req.userAuth._id
    }

    const category = new Category( data )
    
    await category.save()

    return res.status(200).json({
        ok: true,
        category
    })
}

const updateCategory = async(req = request, res = response) => {
    const { id } = req.params
    const { userAuth, ...data } = req.body


    try {
        data.name = data.name.toUpperCase()
        data.userAuth = req.userAuth._id
        const categoryExist = await Category.findOne({ _id: { $ne: id }, name: data.name });
        if( categoryExist ){
            return res.status(400).send('El nombre ya existe');
        }
        const category = await Category.findByIdAndUpdate( id, data, { new: true } );
        return res.status(200).json(category)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
   
}

const deleteCategory = async(req, res = response) => {
    const { id } = req.params

    const categoryDelete = await Category.findByIdAndUpdate(id, {status: false}, { new: true })
    return res.status(200).json({
        categoryDelete
    })
}

module.exports = {
    getCategories,
    getCategoryID,
    createCategory,
    updateCategory,
    deleteCategory
}