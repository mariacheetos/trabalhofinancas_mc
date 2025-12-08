document.getElementById("formsalario").addEventListener("submit", function (event) {
    event.preventDefault();

    var salario = Number(document.getElementById("salario").value);
    localStorage.setItem("salario", salario);


    alert("Salário salvo com sucesso!");
    exibir_despesas();
});


document.getElementById("formdespesa").addEventListener("submit", function (event) {
    event.preventDefault();


    var nome = document.getElementById("nome").value;
    var data = document.getElementById("data").value;
    var valor = Number(document.getElementById("valor").value);


    var despesa = { nome, data, valor };


    var lista_despesas = JSON.parse(localStorage.getItem("relacaodespesas")) || [];
    lista_despesas.push(despesa);


    localStorage.setItem("relacaodespesas", JSON.stringify(lista_despesas));


    document.getElementById("formdespesa").reset();
    exibir_despesas();
});


function exibir_despesas() {
    var lista_despesas = JSON.parse(localStorage.getItem("relacaodespesas")) || [];
    var salario = Number(localStorage.getItem("salario") || 0);
    var output = document.getElementById("output");


    output.innerHTML = "";
    let salarioLi = document.createElement("li");
    salarioLi.style.fontWeight = "bold";
    salarioLi.textContent = "SALÁRIO ATUAL: R$ " + salario;
    output.appendChild(salarioLi);


    if (lista_despesas.length === 0) {
        output.innerHTML += "<li>Nenhuma despesa cadastrada.</li>";
        return;
    }


    let totalDespesas = 0;


    lista_despesas.forEach(function (item) {
        let li = document.createElement("li");
        li.textContent = `Nome: ${item.nome} | Data: ${item.data} | Valor: R$ ${item.valor}`;
        output.appendChild(li);
        totalDespesas += item.valor;
    });


    let resumo = document.createElement("li");
    resumo.style.fontWeight = "bold";
    resumo.style.marginTop = "10px";
    resumo.textContent =
        `TOTAL DESPESAS: R$ ${totalDespesas} | SALDO FINAL: R$ ${salario - totalDespesas}`;
    output.appendChild(resumo);
}


document.getElementById("limpar").addEventListener("click", function () {
    localStorage.clear();
    exibir_despesas();
});


window.onload = exibir_despesas;