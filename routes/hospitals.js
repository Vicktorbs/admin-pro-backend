const { Router } = require("express");
const { check } = require("express-validator");
const { getHostpitals, updateHostpitals, deleteHostpitals, createHostpital } = require("../controllers/hospitals");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', getHostpitals);
router.post('/', 
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        validarCampos
    ], 
    createHostpital
);
router.put('/:id', 
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        validarCampos
    ], 
    updateHostpitals
 );
router.delete('/:id', validateJWT, deleteHostpitals);

module.exports = router;