const { response, request } = require("express")
const User = require("../models/user")
const bcryptjs = require("bcryptjs")

const getUser = async(req = request, res = response) => {

    const { limite = 5, from = 0 } = req.query
    const query = { status: true }

    // const users = await User.find(query)
    //     .skip(Number(from))
    //     .limit(Number(limite))

    // const count = await User.countDocuments(query)   
    
    const [ count, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limite))
    ])

    return res.json({
        count,
        users
        // count,
        // users   
    })
}

const postUser = async(req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role})

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save()

    return res.status(200).json({
        ok: true,
        user,
    })
}

const deleteUser = async(req, res = response) => {

    const { id } = req.params

    // Borrado fisico
    // const user = await User.findByIdAndDelete( id )

    const user = await User.findByIdAndUpdate( id, { status: false } )
    const userAuth = req.userAuth

    return res.json({
        user,
        userAuth
    })
}

const putUser = async (req, res = response) => {
    const { id } = req.params
    const { _id, password, google, email, ...all } = req.body

    if( password ){
        const salt = bcryptjs.genSaltSync();
        all.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, all )

    return res.json({
        ok: true,
        user,
    })
}    

module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser
}