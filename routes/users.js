const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, createUser, updateUser } = require("../controllers/users");
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
router.put('/:id', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('role', 'Role is required').not().isEmpty(),
        validarCampos
    ], 
    updateUser
 );


module.exports = router;