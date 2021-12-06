document.cookie = "AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax";

function calculaTotal() {
    grafico(listaDePedido.getPedidos());
    let total = listaDePedido.getTotalCompra();
    totHtml = document.getElementById("total");
    totHtml.innerText = total.toFixed(2).toString().replace(".", ",");
}

function calculaPreco(quantidade, preco) {
    return (preco * quantidade).toFixed(2);
}

function itemLista(pedido) {
    corpoItem = document.createElement("div");
    corpoItem.classList.add("item");
    corpoItem.classList.add("flex");
    corpoItem.classList.add(pedido.codigo);

    sp = document.createElement("span");
    texto = `${pedido.produto.nome} R$ ${pedido.produto.preco.toFixed(2).toString().replace(".", ",")}`;
    sp.innerHTML = texto;

    lista = document.querySelector(".listaP");
    lista.appendChild(corpoItem);
    quant_sub = document.createElement("div");
    quantidade = document.createElement("input");
    quantidade.type = "number";


    quantidade.classList.add("quantidade");
    quantidade.classList.add("border");
    quantidade.min = 1;
    quantidade.max = 99;
    quantidade.value = pedido.quantidade;
    //criando calculo de subtotal
    sub = document.createElement("span");
    sub.classList.add("sub-total");

    preco = pedido.produto.preco * pedido.quantidade;
    preco = preco.toFixed(2);
    sub.innerText = `R$ ${preco.toString().replace(".",",")} `;


    quantidade.addEventListener("change", function atualizaQuant() {
        pedido.atualizaQuantidade(this.value);
        sub = document.querySelector("." + pedido.codigo).querySelector(".sub-total");
        preco = pedido.produto.preco * pedido.quantidade;
        preco = preco.toFixed(2);
        sub.innerText = `R$ ${preco.toString().replace(".",",")} `;
        calculaTotal();
    });
    //criando botao de excluir elemento
    btn = document.createElement("button");
    btn.type = "button";
    btn.classList.add("btn");
    btn.classList.add("btn-light");
    btn.addEventListener("click", function() {
        listaDePedido.delete(pedido.codigo);
        listaHMTL = document.querySelector(".listaP");
        item = document.querySelector("." + pedido.codigo);
        listaHMTL.removeChild(item);
        calculaTotal();
    });
    icon = document.createElement("i");
    icon.classList.add("fas");
    icon.classList.add("fa-trash-alt");
    btn.appendChild(icon);
    //Adicionando elemento na Div quant_sub
    quant_sub.appendChild(quantidade);
    quant_sub.appendChild(sub);
    quant_sub.appendChild(btn)

    corpoItem.appendChild(sp);
    corpoItem.appendChild(quant_sub);

    lista.appendChild(corpoItem);
    calculaTotal();
}

function grafico(listaPedidos) {
    let g = document.getElementById('grafico').getContext('2d');

    let produtos = []
    let calorias = []

    let max = 0;
    listaPedidos.forEach(function(pedido) {
        produtos.push(pedido.produto.nome);
        calorias.push(pedido.produto.calorias);
        if (pedido.produto.calorias > max) {
            max = pedido.produto.calorias;
        }
    });

    max *= 1.1;
    graficoChart.data.labels = produtos;
    graficoChart.data.datasets[0]["data"] = calorias



    let options = {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 1,
                suggestedMax: max
            }
        }
    };
    console.log(graficoChart.options)
    graficoChart.options = options;
    graficoChart.update();
    /*
    let dados = {
        labels: produtos,
        datasets: [{
            label: 'Calorias dos Alimentos',
            data: calorias
        }]
    }


    let options = {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 1,
                suggestedMax: max
            }
        }
    };
    */

    /*
    let tabela = new Chart(g, {
        type: 'radar',
        data: dados,
        options: options
    });
    */

}