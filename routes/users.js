const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/users");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', validateJWT, getUsers);
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
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('role', 'Role is required').not().isEmpty(),
        validarCampos
    ], 
    updateUser
);
router.delete('/:id', validateJWT, deleteUser);

module.exports = router;