class Produto {
    constructor(codigo, nome, preco, calorias) {
        this.codigo = codigo;
        this.nome = nome;
        this.preco = preco;
        this.calorias = calorias;
    }
    getCodigo() {
        return this.codigo;
    }
}

class ProdutosLista {
    constructor() {
        this.produtos = new Array();
    }
    addProduto(produto) {
        this.produtos.push(produto);
    }
    getProduto(codigo) {
        let produto;
        this.produtos.forEach(function(item) {
            if (codigo == item.codigo) {

                produto = item;
            }
        });
        return produto;
    }

}

class Pedido {
    constructor(produto, quantidade) {
        this.codigo = "p" + (Math.floor(Math.random() * 100));
        this.produto = produto;
        this.quantidade = quantidade;
        this.data = Date();
    }
    atualizaQuantidade(quantidade) {
        this.quantidade = quantidade;
    }
}

class PedidosLista {
    constructor() {
        this.pedidos = new Array();
    }
    set(pedido) {
        this.pedidos.push(pedido);
    }
    existePedido(codigo) {
        var existe = false;
        this.pedidos.forEach(function(pedido) {
            if (pedido.produto.codigo == codigo) {
                existe = true;
            }
        });
        return existe;
    }
    getPedido(codigo) {
        let pedidoR = 0;
        this.pedidos.forEach(function(pedido) {
            if (pedido.produto.codigo == codigo) {
                pedidoR = pedido;
                pedidoR.atualizaQuantidade(pedido.quantidade + 1);
            }
        });
        return pedidoR;
    }
    delete(codigo) {
        this.pedidos.forEach(function(pedido, i, pedidos) {
            if (pedido.codigo == codigo) {
                pedidos.splice(i, 1);
            }
        });
    }
    getPedidos() {
        return this.pedidos;
    }
    getTotalCompra() {
        let soma = 0;
        this.pedidos.forEach(function(pedido) {
            soma += pedido.quantidade * pedido.produto.preco;
        });
        return soma;
    }

}