const supabase = require("../../index")
const db = require("../database/mongodb");
const { obterItensAleatorios, filtrarIdFilme, filtrarNome } = require("../services/movieFlix");

async function getUltimosFilmes(req, res) {
    const filmes = await supabase.getUltimosFilmesAdicionados();
    filmes.length = 10;
    res.render('movieflix', { filmes: filmes });
}

async function getTodosFilmes(req, res) {
    const filmes = await supabase.getFilmes();
    res.render('filmes', { filmes: filmes, pesquisa: "Todos os Filmes" });
}

async function getFilmes(req, res) {
    const filmePesquisado = req.params.filmes;
    const filmes = await supabase.getPesquisaFilmes(filmePesquisado);
    res.render('filmes', { filmes: filmes, pesquisa: filmePesquisado });
}

async function getFilme(req, res) {
    const filme = req.params.filme;
    const filmeSelecionado = await supabase.getFilme(filme);
    const filmes = await supabase.getFilmes();
    const filmesRecomendados = obterItensAleatorios(filmes, 5);
    res.render('filme', { filme: filmeSelecionado, filmesRecomendados: filmesRecomendados });
}

async function validaFilme(req, res) {
    const filmePesquisado = req.body.Filme;
    const filmes = await supabase.getPesquisaFilmes(filmePesquisado);
    if (filmes.length == 1) {
        return res.send(({ resultados: 1, Filme: filmePesquisado }));
    }
    if (filmes.length > 1) {
        return res.send(({ resultados: filmes.length, Filme: filmePesquisado }));
    }
    else {
        return res.send(({ resultados: 0 }));
    }
}

async function getFilmesFavoritos(req, res) {
    const usuario = req.cookies.usuario;
    const filmes = await db.getFavoritosUsuario(usuario);

    const usuarios = await db.getUsuarios();
    const dadosUsuario = filtrarNome(usuarios, usuario);

    const usuariofilmes = filtrarIdFilme(filmes);
    const favoritos = await supabase.getFilmesPreferidosUsuario(usuariofilmes);
    res.render("favoritos", { filmes: favoritos, quantidade: favoritos.length, nome: dadosUsuario[0].toUpperCase() })
}


async function postFilmesFavoritos(req, res) {
    const usuario = req.cookies.usuario;
    const IdFilme = req.body.IdFilme;
    const filmes = await db.getFavoritosUsuario(usuario);

    function verificaID(value) {
        return value == IdFilme;
    }
    const usuariofilmes = filtrarIdFilme(filmes).filter(verificaID);

    if (usuariofilmes.length == 1) {
        return res.send(({ resultados: false, mensagem: "O Filme ja existe em sua lista de favoritos!" }));
    }
    else {
        try {
            await db.insertFavoritos({ usuarios_id: usuario, filme_id: IdFilme });
            return res.send(({ resultados: true }));
        }
        catch (e) {
            return res.send(({ resultados: false, mensagem: e.message }));
        }
    }

}

async function deleteFilmesFavoritos(req, res) {
    const usuario = req.cookies.usuario;
    const filmePesquisado = req.body.IdFilme;
    const filmesdoUsuario = await db.getFavoritosUsuario(usuario);

    function verificaID(value) {
        return value.filme_id == filmePesquisado;
    }
    const IdRegistro = filmesdoUsuario.filter(verificaID);
    try {
        await db.deleteFavoritos(IdRegistro[0])
        return res.send(({ resultados: true }));
    } catch (e) {
        return res.send(({ resultados: false, mensagem: e.message }));
    }
}


async function adicionarNovaRecomendacao(req, res) {
    const usuario = req.cookies.usuario;
    const filme = req.body.Filme;
    const usuarios = await db.getUsuarios();
    const dadosUsuario = filtrarNome(usuarios, usuario);
    dadosUsuario.push(filme);
    return res.send(({ resultados: dadosUsuario }));
}

module.exports = {
    getUltimosFilmes, validaFilme, getTodosFilmes, getFilme, getFilmes, getFilmesFavoritos, postFilmesFavoritos, deleteFilmesFavoritos, adicionarNovaRecomendacao
}
