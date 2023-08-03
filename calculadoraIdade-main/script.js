// Desenvolver a calculadora idade. //
// 1. Pegar os valores OK
// 2. Calcular a Idade 
//    a. Com base no ano OK
//    b. Com mês (EXTRA)
//    c. Com dia (EXTRA)

// 3. Gerar a faixa etária
//    Resultado            Faixa
//    0 à 12                Criança
//    13 à 17               Adolescente
//    18 à 65               Adulto
//    Acima de 65           Idoso

// 4. Organizar o objeto pessoa para salvar na lista
// 5. Cadastrar a pessoa na lista
// 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
// 7. Renderizar o conteúdo da tabela com as pessoas cadastradas
// 8. Botão para limpar os registros

function calcular(event) {
    event.preventDefault()
    console.log("Foi executada a função calcular")

    // 1. Pegar os valores
    let usuario = receberValores()
    
    // 2. Calcular a Idade
    //    a. Com base no ano
    let idadeCalculada = calcularIdade(usuario.ano_nascimento)

    // 3. Gerar a faixa etária
    let classificacaoEtaria = gerarFaixa(idadeCalculada)
    console.log(classificacaoEtaria);

    // 4. Organizar o objeto pessoa para salvar na lista
    usuario = organizarDados(usuario, idadeCalculada, classificacaoEtaria)

    // 5. Cadastrar a pessoa na lista
    cadastrarUsuario(usuario)

    // 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
    carregarUsuarios()
}

function receberValores() {
    let nomeRecebido = document.getElementById("nome").value.trim()
    let diaNascimento = document.getElementById("dia_nascimento").value
    let mesNascimento = document.getElementById("mes_nascimento").value
    let anoNascimento = document.getElementById("ano_nascimento").value

    let dadosUsuario = {
        nome: nomeRecebido,
        dia_nascimento: diaNascimento,
        mes_nascimento: mesNascimento,
        ano_nascimento: anoNascimento,
        
    }
    console.log(dadosUsuario);
    return dadosUsuario
}

// 2. Calcular a Idade
function calcularIdade(dia_nascimento, mes_nascimento, ano_nascimento) {
    let dataAtual = new Date().getFullYear();
    idade = dataAtual - dia_nascimento, mes_nascimento, ano_nascimento;
    console.log(idade);
    return idade;
}

// 3. Gerar a faixa etária
//    Resultado            Faixa
//    0 à 12                Criança
//    13 à 17               Adolescente
//    18 à 65               Adulto
//    Acima de 65           Idoso

function gerarFaixa(faixaEtaria) {
    if (faixaEtaria >= 0 && faixaEtaria <= 12) {
        return "Criança"
    } else if (faixaEtaria >= 13 && faixaEtaria <= 17) {
        return "Adolescente"
    } else if (faixaEtaria >= 18 && faixaEtaria <= 65) {
        return "Adulto"
    } else {
        return "Idoso"
    }
}

// 4. Organizar o objeto pessoa para salvar na lista
function organizarDados(dadosUsuario, dataNascimento, classificacaoEtaria) {
    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        nascimento: dataNascimento,
        classificacao: classificacaoEtaria,
    }

    return dadosUsuarioAtualizado;
}

// 5. Cadastrar a pessoa na lista
function cadastrarUsuario(dadosUsuario) {
    let listaUsuarios = []

    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaUsuarios = JSON.parse( localStorage.getItem("usuariosCadastrados") )
    }
    listaUsuarios.push(dadosUsuario)
    localStorage.setItem("usuariosCadastrados",  JSON.stringify(listaUsuarios) )
}

// 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
function carregarUsuarios() {
    let listaCarregada = []

    if(localStorage.getItem("usuariosCadastrados") != null) {
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }
    if(listaCarregada.length == 0) {
        let tabela = document.getElementById("corpo-tabela")

        tabela.innerHTML = `<tr class="linha-mensagem">
            <td colspan="6">Nenhum usuario cadastrado ☹ </td>
        </tr>`

    } else {
        montarTabela(listaCarregada)
    }
    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios() )

// 7. Renderizar o conteúdo da tabela com as pessoas cadastradas
function montarTabela(listaUsuarios) {
    let tabela = document.getElementById("corpo-tabela")

    let template = ""

    listaUsuarios.forEach(usuario => {
        template += `<tr>
            <td data-cell="nome">${usuario.nome}</td>
            <td data-cell="data de nascimento">${usuario.dia_nascimento} / ${usuario.mes_nascimento} / ${usuario.ano_nascimento}</td>
            <td data-cell="idade">${usuario.nascimento} anos </td>
            <td data-cell="classificação do IMC">${usuario.classificacao}</td>
        </tr>`
    })

    tabela.innerHTML = template;
}

// 8. Botão para limpar os registros
function deletarRegistros() {
    localStorage.removeItem("usuariosCadastrados")
    window.location.reload()
}
