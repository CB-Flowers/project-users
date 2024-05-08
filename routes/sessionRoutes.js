// Importamos express y creamos un router.

const express = require("express");
const router = express.Router();

const sessionController = require("../controllers/sessionController");
const verifyToken = require("../middleware/verifyToken");

router.get("/currentUser", verifyToken, sessionController.getCurrentUser);

module.exports = router;
