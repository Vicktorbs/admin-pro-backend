const { Router } = require("express");
const { check } = require("express-validator");
const { getMedics, createMedic, updateMedic, deleteMedic } = require("../controllers/medics");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', getMedics);
router.post('/', 
    [], 
    createMedic
);
router.put('/:id', 
    [], 
    updateMedic
 );
router.delete('/:id', deleteMedic);

module.exports = router;