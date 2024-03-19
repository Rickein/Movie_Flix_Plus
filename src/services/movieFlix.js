function obterItensAleatorios(listaOriginal, quantidade) {
    if (quantidade > listaOriginal.length) {
        console.log("A quantidade solicitada é maior do que o comprimento da lista original.");
        return;
    }

    let listaCopiada = listaOriginal.slice();
    let itensAleatorios = [];

    for (let i = 0; i < quantidade; i++) {
        let indiceAleatorio = Math.floor(Math.random() * listaCopiada.length);
        itensAleatorios.push(listaCopiada[indiceAleatorio]);
        listaCopiada.splice(indiceAleatorio, 1);
    }
    return itensAleatorios;
}


function filtrarIdFilme(lista) {
    var novaLista = [];
    lista.forEach(element => {
        novaLista.push(element.filme_id);
    });
    return novaLista;
}

function filtrarNome(lista, id) {
    var novaLista = [];
    lista.forEach(element => {
        if (element._id.toString() == id) {
            novaLista.push(element.Nome)
            novaLista.push(element.Email)
        }
    });
    return novaLista
}

module.exports = {
    obterItensAleatorios, filtrarIdFilme, filtrarNome
}