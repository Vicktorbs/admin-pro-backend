const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post('/',
    [
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        validarCampos
    ],
    login
)

module.exports = router;