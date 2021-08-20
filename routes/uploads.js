const { Router } = require("express");
const expressfileUpload = require('express-fileupload');
const { fileUpload } = require("../controllers/uploads");
const { validateJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Upload files
router.use(expressfileUpload());

router.put('/:type/:id', validateJWT, fileUpload);

module.exports = router;