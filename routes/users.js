const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, createUser } = require("../controllers/users");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get('/', getUsers);
router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        validarCampos
    ], 
    createUser
);

module.exports = router;