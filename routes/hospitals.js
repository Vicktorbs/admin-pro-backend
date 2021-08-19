const { Router } = require("express");
const { check } = require("express-validator");
const { getHostpitals, updateHostpitals, deleteHostpitals, createHostpital } = require("../controllers/hospitals");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', getHostpitals);
router.post('/', 
    [], 
    createHostpital
);
router.put('/:id', 
    [], 
    updateHostpitals
 );
router.delete('/:id', deleteHostpitals);

module.exports = router;