const { Schema, model } = require("mongoose")


const UserSchema = Schema({
    name: {
        type: String,
        require: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        require: [true, "El correo es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "La contraseña es obligatorio"]
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        enum: ["ADMIN", "USER"]
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }
})

// Para remover datos que no se desea ver en el payload
UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject()
    user.uid = _id
    return user
}


module.exports = model( "User", UserSchema )