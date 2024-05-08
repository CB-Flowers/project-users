const authService = require("../services/authService");
const AuthToken = require("../models/AuthToken");
const bcryptService = require("../services/bcryptService");
const User = require("../models/User");


/**
 * INICIARS SESION DE USUARIO
 * @param req
 * @param res
 */
function login(req, res) {
    const {email, password} = req.body;

    User.findOne({email})
        .then((user) => {
            if (!user) {
                return res.status(401).json({message: "Ha ocurrido un error al iniciar sesion: Credenciales Invalidas"});
            }

            bcryptService
                .comparePassword(password, user.password)
                .then((match) => {
                    if (!match) {
                        return res.status(401).json({message: "Ha ocurrido un error al iniciar sesion: Credenciales Invalidas"});
                    }

                    const token = authService.generateToken(user);

                    AuthToken.create({userId: user._id, token})
                        .then(() => {
                            res.json({token});
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).json({message: "Ha ocurrido un error al iniciar sesion TYPE 1"});
                        });
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({message: "Ha ocurrido un error al iniciar sesion TYPE 2"});
                });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({message: "Ha ocurrido un error al iniciar sesion TYPE 3"});
        });
}


/**
 * CERRAR SESION DE USUARIO
 * @param req
 * @param res
 */
function logout(req, res) {
    const token = req.headers.authorization.split(" ")[1]

    // Buscamos el token en la base de datos y lo eliminamos
    AuthToken.findOneAndDelete({token})
        .then(() => {
            res.status(200).json({message: "Sesion cerrada exitosamente", error: {token}})
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json({message: "Error al iniciar sesion"})
        })
}

module.exports = {
    login,
    logout,
};
