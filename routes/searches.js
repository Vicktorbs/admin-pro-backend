const { Router } = require("express");
const { getSearchs, getDocumentsByColection } = require("../controllers/searches");
const { validateJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/:search', validateJWT, getSearchs);
router.get('/collection/:collection/:search', validateJWT, getDocumentsByColection);

module.exports = router;