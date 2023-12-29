const { response, request } = require("express")


const getUser = (req = request, res = response) => {
    const { q, nombre, apellido, page = '1' } = req.query

    res.json({
        ok: true,
        q,
        nombre,
        apellido,
        page
    })
}

const putUser = (req, res = response) => {
    res.json({
        ok: true,
        msg: "put API - controller"
    })
}

const postUser = (req, res = response) => {
    const id = req.params.id
    const { nombre, edad } = req.body
    res.json({
        ok: true,
        nombre,
        edad,
        id
    })
}

const deleteUser = (req, res = response) => {
    res.json({
        ok: true,
        msg: "delete API - controller"
    })
}

module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser
}