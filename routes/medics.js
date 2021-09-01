const { Router } = require("express");
const { check } = require("express-validator");
const { getMedics, createMedic, updateMedic, deleteMedic, getMedicById } = require("../controllers/medics");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', validateJWT, getMedics);
router.post('/', 
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('hospital', 'Hospital ID is required').isMongoId(),
        validarCampos
    ], 
    createMedic
);
router.put('/:id', 
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('hospital', 'Hospital ID is required').isMongoId(),
        validarCampos
    ], 
    updateMedic
 );
router.delete('/:id', validateJWT, deleteMedic);
router.get('/:id', validateJWT, getMedicById);

module.exports = router;