const db = require("../database/mongodb");
function loginUsuario(req, res) {
    if (req.session.login) {
        res.redirect('movieflix');
    } else {
        res.render('login');
    }
}

async function validaLoginUsuario(req, res) {

    const usuario = await db.getUsuario({ "Email": req.body.Email });
    if (usuario == null || usuario.Senha != req.body.Senha) {
        res.send(({ resultado: 'invalido' }));
    } else {
        req.session.login = usuario._id.toString();
        res.cookie('usuario', req.session.login, { maxAge: 4600000 });
        res.send(({ resultado: 'logado' }));
    }
}

async function criaLoginUsuario(req, res) {

    try {
        await db.insertUsuario(req.body);
        res.send(({ resultado: 'criado' }));
    }
    catch (e) {
        res.send(({ resultado: 'erro', mensagem: e.message }));
    }
}

module.exports = {
    loginUsuario, validaLoginUsuario, criaLoginUsuario
}
