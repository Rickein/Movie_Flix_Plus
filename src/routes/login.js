const { Router } = require("express");
const {loginUsuario,validaLoginUsuario,criaLoginUsuario} = require ("../controllers/login");
const router = Router()

router.get('/',loginUsuario);
router.post('/',criaLoginUsuario);
router.post('/validaLogin',validaLoginUsuario);
// router.post('/',validaLoginUsuario);

module.exports = router