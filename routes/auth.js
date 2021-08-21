const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
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

router.post('/google',
    [
        check('token', 'Google token is required').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
)

module.exports = router;