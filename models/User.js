// Importamos Mongoose para definir y tener el esquema de usuario y el modelo.

const mongoose = require("mongoose");
const bcryptService = require("../services/bcryptService");


const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    edad: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});


userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    bcryptService
        .hashPassword(this.password)
        .then((hashedPassword) => {
            this.password = hashedPassword;
            next()
        })
        .catch((error) => {
            console.error(error);
            next(error)
        });
});


const User = mongoose.model("User", userSchema);

module.exports = User;
