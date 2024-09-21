const { Schema, model } = require("mongoose")


const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        require: true
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        require: true
    },
    available: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        require: true
    }
 })

 ProductSchema.methods.toJSON = function(){
    const { __v, ...product } = this.toObject()
    return product
}

module.exports = model( "Product", ProductSchema )