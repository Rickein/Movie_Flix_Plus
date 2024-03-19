function AutenticarLogin() {

    Carregamento();

    // let nome = $("#NewName").val();
    let email = $('#emailLogin').val();
    let senha = $('#passwordLogin').val();

    if (email == "" || senha == "") {

        Carregamento();

        Swal.fire({
            title: "Login e/ou senha não informado",
            text: "Verifique seus dados e tente novamente",
            icon: "info"
        });
        return
    }

    GetLogin(email, senha);
}

function NovoUsuario() {

    Carregamento();

    let nome = $("#NewName").val();
    let email = $('#NewEmail').val();
    let senha = $('#NewPassword').val();

    if (email == "" || senha == "" || nome == "") {

        Swal.fire({
            title: "Existem campos não preenchidos",
            text: "Verifique os dados e tente novamente",
            icon: "info"
        });
        Carregamento();

        return
    }

    console.log(nome, email, senha);
    PostLogin(nome, email, senha);

}


function GetLogin(email, senha) {

    // var form =  $(`#login`)[0];
    // form.submit();

    $.ajax({
        type: "POST",
        url: "/login/validaLogin",
        data: {
            "Email": email,
            "Senha": senha,
        },
        success: function (r) {

            if (r.resultado == "invalido") {
                Swal.fire({
                    title: "Login e/ou senha invalidos",
                    text: "Verifique seus dados e tente novamente",
                    icon: "info"
                });

                Carregamento();
            }
            if (r.resultado == "logado") {
                window.location.href = "/movieflix";
            }

        },
        dataType: "json"
    });

}

function PostLogin(nome, email, senha) {
    $.ajax({
        type: "POST",
        url: "/login",
        data: {
            "Nome": nome,
            "Email": email,
            "Senha": senha,
        },
        success: function (r) {

            if (r.resultado == "criado") {
                Carregamento();

                $('#novo_cadastro')[0].reset();
                $('#modal-cadastro').modal('toggle');

                Swal.fire({
                    title: "Usuario criado com sucesso",
                    text: "Prossiga com o acesso a plataforma",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });

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



function Carregamento() {
    $('.body-loader').toggle();
}