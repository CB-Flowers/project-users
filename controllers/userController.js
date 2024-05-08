// Importamos el modelo de Mongo

const User = require("../models/User");
const bcryptService = require("../services/bcryptService");
const AuthToken = require("../models/AuthToken");


/**
 * LISTAR TODOS LOS USUARIOS
 * @param req
 * @param res
 */
function getAllUsers(req, res) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.sendStatus(401); // Unauthorized
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    User.find()
        .then((users) => res.status(200).json(users))
        .catch((err) => {
            console.error(err);
            res.status(500).send("Ha ocurrido un error al LISTAR los usuarios");
        });

}


/**
 * CREAR UN USUARIO
 * @param req
 * @param res
 */
function createUser(req, res) {

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.sendStatus(401); // Unauthorized
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    const {nombre, edad, email, password} = req.body;

    User.create({nombre, edad, email, password})
        .then((newUser) => res.status(201).json(newUser))
        .catch((err) => {
            console.error(err);
            res.status(500).send("Ha ocurrido un error al CREAR un usuario");
        });


}


/**
 * ACTUALIZAR UN USUARIO
 * @param req
 * @param res
 */
function updatedUser(req, res) {

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.sendStatus(401); // Unauthorized
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    const userId = req.params.id;

    const updatedUser = req.body;

    User.findByIdAndUpdate(userId, updatedUser, {new: true})
        .then((user) => res.status(200).json(user))
        .catch((err) => {
            console.error(err);
            res.status(500).send("Ha ocurrido un error al ACTUALIZAR un usuario");
        });
}

/**
 * ELIMINA UN USUARIO
 * @param req
 * @param res
 */
function deleteUser(req, res) {

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.sendStatus(401); // Unauthorized
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    // Obtenemos el id del usuario a actualizar.
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
        .then(() => res.status(200).send("Usuario eliminado correctamente"))
        .catch((err) => {
            console.error(err);
            res.status(500).send("Ha ocurrido un error al ELIMINAR un usuario");
        });

}


module.exports = {
    createUser,
    deleteUser,
    getAllUsers,
    updatedUser
}