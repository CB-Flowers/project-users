const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    return new Promise((resolve, reject) => {
        const token = req.headers.authorization;

        if (!token) {
            reject({
                status: 401,
                message: "Token de autenticación no ingresado",
            });
        }

        jwt.verify(
            token.split(" ")[1],
            "79727ffc6b48c4b76d8252ba586bf588102333db229f21335e9ed2f2e18b2a03",
            (error, decodedToken) => {
                if (error) {
                    reject({status: 401, message: "Token de autenticacion no válido"});
                } else {
                    req.userId = decodedToken.userId;
                    resolve();
                }
            }
        );
    })
        .then(() => next())
        .catch((error) =>
            res.status(error.status || 500).json({message: error.message})
        );
}

module.exports = verifyToken;
