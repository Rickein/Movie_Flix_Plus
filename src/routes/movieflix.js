const { Router } = require("express");

const { getUltimosFilmes, validaFilme,getFilme,getTodosFilmes,getFilmes,getFilmesFavoritos,postFilmesFavoritos,deleteFilmesFavoritos,adicionarNovaRecomendacao } = require("../controllers/movieflix");
const router = Router()

router.get('/', getUltimosFilmes);

router.post('/verificaFilme', validaFilme);

router.get('/filmes/:filmes', getFilmes);

router.get('/filmes/', getTodosFilmes);

router.get('/filme/:filme', getFilme);

router.get('/favoritos', getFilmesFavoritos);

router.post('/adicionarFavoritos', postFilmesFavoritos);
router.post('/removerFavoritos', deleteFilmesFavoritos);

router.post('/adicionarRecomendacao', adicionarNovaRecomendacao);
module.exports = router