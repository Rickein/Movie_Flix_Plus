
function pesquisaFilmeEspecifico() {
    const nomeFilme = $("#Pesquisa-nome").val();
    console.log(nomeFilme);

    if (nomeFilme) {
        Carregamento();

        $.ajax({
            type: "POST",
            url: "/movieflix/verificaFilme",
            data: {
                "Filme": nomeFilme
            },
            success: function (r) {
                Carregamento();

                if (r.resultados == 1) {
                    window.location.href = `/movieflix/filme/${r.Filme}`;
                }
                if (r.resultados == 0) {
                    Swal.fire({
                        title: "Filme não encontrado",
                        text: "Gostaria de recomendar ao nosso Catalogo?",
                        icon: "info",
                        showCancelButton: true,
                        confirmButtonText: "Recomendar",
                        cancelButtonText: `Voltar`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('#modal-cadastro-filme').modal('toggle');
                        }
                    });
                }
                else {
                    window.location.href = `/movieflix/filmes/${r.Filme}`;
                }
            },
            dataType: "json"
        });
    }
}

function verificarFilme(filme) {
    Carregamento();
    window.location.href = `/movieflix/filme/${filme}`;
    Carregamento();
};

function Carregamento() {
    $('.body-loader').toggle();
}
function salvarFavoritos(Id) {
    Carregamento();

    $.ajax({
        type: "POST",
        url: "/movieflix/adicionarFavoritos",
        data: {
            "IdFilme": Id
        },
        success: function (r) {
            Carregamento();

            if (r.resultados) {
                Swal.fire({
                    title: "Filme Adicionado",
                    text: "Filme Adicionado a sua lista de favoritos",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                Swal.fire({
                    title: "Algo deu Errado",
                    text: r.mensagem,
                    icon: "info",
                });
            }
        },
        dataType: "json"
    });
}

function removerFavoritos(Id) {
    Swal.fire({
        title: "Atenção!",
        text: "esta ação irá remover o filme de sua lista de favoritos",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Remover",
        cancelButtonText: `Voltar`
    }).then((result) => {
        if (result.isConfirmed) {
            // Carregamento(); 
            $.ajax({
                type: "POST",
                url: "/movieflix/removerFavoritos",
                data: {
                    "IdFilme": Id
                },
                success: function (r) {
                    Carregamento();
                    if (r.resultados) {
                        Swal.fire({
                            title: "Filme Removido",
                            text: "Filme removido com sucesso",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 3000
                        }).then((result) => {
                            setTimeout(location.reload(), 4000)
                        }
                        );

                    }
                    else {
                        Carregamento();
                        Swal.fire({
                            title: "Algo deu Errado",
                            text: r.mensagem,
                            icon: "info",
                        });
                    }
                },
                dataType: "json"
            });
        }
    });
}


async function SugerirFilme() {

    //https://docs.google.com/spreadsheets/d/1lh2lriyOjUw0c-XlVDWEIxhewJXt6dw4bJ7VRxIuRNU/edit?usp=sharing

    var filme = $(`#Titulo`).val();

    if (filme == null || filme == "") {

        return

    } else {

        Carregamento();

        await validaFilme(filme).then((result) => {

            if (result == 1) {

                Carregamento();

                Swal.fire({
                    title: "Atenção!",
                    text: "o Filme ja existe em nosso Catalogo",
                    icon: "info",
                    showConfirmButton: false,
                    timer: 2500
                });

            } else {
                $.ajax({
                    type: "POST",
                    url: "/movieflix/adicionarRecomendacao",
                    data: {
                        "Filme": filme
                    },
                    success: function (r) {

                        if (r.resultados) {

                            var Nome = r.resultados[0];
                            var Email = r.resultados[1];
                            var Filme = r.resultados[2];

                            const url = 'https://api.sheetmonkey.io/form/bn1RJsPsxxdB9WefpAhZku';
                            fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                },
                                body: JSON.stringify({ Nome: Nome, Email: Email, Sugestao: Filme })
                            }).then(

                                Carregamento(),
                                Swal.fire({
                                    title: "Recomendação recebida",
                                    text: "O filme será adicionado em Breve",
                                    icon: "success",
                                    showConfirmButton: false,
                                    timer: 2500
                                }),
                                $('#modal-cadastro-filme').modal('toggle'),
                            );
                        }

                    },
                    dataType: "json"
                });

            }
        });

    }

}

function validaFilme(filme) {

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/movieflix/verificaFilme",
            data: {
                "Filme": filme
            },
            success: function (r) {
                if (r.resultados >= 1) {
                    resolve(1);
                }
                else {
                    resolve(0);
                }
            },
            dataType: "json"
        });
    })
}