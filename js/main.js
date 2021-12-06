produtoslist = new ProdutosLista();
//Lista de Comidas
produtoslist.addProduto(new Produto("comida1", "Pão com Manteiga", 2.5, 139));
produtoslist.addProduto(new Produto("comida2", "Sanduiche Natural", 6.5, 309));
produtoslist.addProduto(new Produto("comida3", "Pão de Queijo", 1.5, 408));
produtoslist.addProduto(new Produto("comida4", "Pão de Queijo Recheado", 1.5, 176));
produtoslist.addProduto(new Produto("comida5", "Croassant de Chocolate ", 4.5, 406));
//Lista de Comidas
produtoslist.addProduto(new Produto("bebida1", "café", 1.0, 120));
produtoslist.addProduto(new Produto("bebida2", "café com leite", 2.5, 110));
produtoslist.addProduto(new Produto("bebida3", "Achocolatado", 3.5, 185));
produtoslist.addProduto(new Produto("bebida4", "chá", 1.5, 1));
produtoslist.addProduto(new Produto("bebida5", "refrigerante 350ml", 4.5, 149));

var listaDePedido = new PedidosLista();

let botoes = document.querySelectorAll(".add");

botoes.forEach(function(botao) {
    botao.addEventListener("click", function() {
        id = botao.parentNode.querySelector("span").id;
        if (listaDePedido.existePedido(id) == false) {
            produto = produtoslist.getProduto(id);
            let pedido = new Pedido(produto, 1);
            listaDePedido.set(pedido);
            /*lista = listaDePedido.getPedidos();*/
            itemLista(pedido);
        } else {
            pedido = listaDePedido.getPedido(id);
            pedidoHTML = document.querySelector("." + pedido.codigo);
            pedidoHTML.querySelector(".quantidade").value = pedido.quantidade;
        }
    });
});

let dados = {
    labels: [],
    datasets: [{
        label: 'Calorias dos Alimentos',
        data: [10, 15, 22]
    }]
}



let options = {
    scale: {
        angleLines: {
            display: false
        },
        ticks: {
            suggestedMin: 0,
            suggestedMax: 1000
        }
    }
};


let ctx = document.getElementById('grafico').getContext('2d');
var graficoChart = new Chart(ctx, {
    type: 'radar',
    data: dados,
    options: options
});