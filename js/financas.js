window.onload = function () {
    mostrarDespesas();
    exibirResumo();
}

function Salvar() {
    var salario = Number(document.getElementById("salario").value)
    if (isNaN(salario) || salario == 0) {
        alert("Digite um valor válido.")
        return
    }

    var salarioAtual = Number(localStorage.getItem("salario")) || 0
    var salarioSomado = salarioAtual + salario

    localStorage.setItem("salario", salarioSomado)
    exibirResumo()
    alert("Salário salvo!")
}
function removerS() {
    localStorage.removeItem("salario")
    mostrarDespesas()
    exibirResumo()
    alert("Salário Removido!")
}

function Limpar() {
    var limpar = document.getElementById("salario")
    limpar.value = ''
}

function AdicionarDespesa() {
    var data = document.getElementById("data").value
    var nome = document.getElementById("nome").value
    var valor = Number(document.getElementById("valor").value)
    if (data == "" || nome == "" || isNaN(valor)) {
        alert("Preencha todos os campos!")
        return
    }
    var despesa = {
        data: data,
        nome: nome,
        valor: valor
    };
    var lista = JSON.parse(localStorage.getItem("despesas")) || []
    lista.push(despesa)
    localStorage.setItem("despesas", JSON.stringify(lista))
    mostrarDespesas()
    exibirResumo()
    document.getElementById("data").value = ""
    document.getElementById("nome").value = ""
    document.getElementById("valor").value = ""
}
function remover() {
    localStorage.removeItem("despesas")
    mostrarDespesas()
    exibirResumo()
    alert("Todas as despesas foram removidas!")
}
function removerUltima() {
    var lista = JSON.parse(localStorage.getItem("despesas")) || []

    if (lista.length == 0) {
        alert("Não há despesas para remover!")
        return
    }

    lista.pop()

    localStorage.setItem("despesas", JSON.stringify(lista))
    mostrarDespesas()
    exibirResumo()
    alert("Última despesa removida!")
}
function mostrarDespesas() {
    var lista = JSON.parse(localStorage.getItem("despesas")) || []
    var ul = document.getElementById("mostraLista")
    ul.innerHTML = ""
    for (var i = 0; i < lista.length; i++) {
        var li = document.createElement("li")
        li.innerText = lista[i].data + " | " + lista[i].nome + " | R$ " + lista[i].valor
        ul.appendChild(li)
    }
}

function exibirResumo() {
    var salario = parseFloat(localStorage.getItem("salario") || 0)
    var lista = JSON.parse(localStorage.getItem("despesas")) || []

    var total = 0
    for (var i = 0; i < lista.length; i++) {
        total = total + lista[i].valor
    }
    var saldo = salario - total
    document.getElementById("resumo").innerText =
        "Salário: R$ " + salario +
        " | Total de despesas: R$ " + total +
        " | Saldo final: R$ " + saldo
}