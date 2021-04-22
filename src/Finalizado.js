import React from "react";

const Finalizado = (props) => {

    const total = () => {
        const valor = props.pedido.reduce((total, produtoAtual) => total + produtoAtual.preco, 0);
        const valorTotal = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

        return valorTotal;
    }

    return <div className="Carrinho">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th colspan="3"><h2>O numero do seu pedido é {props.generateOrderCode()}</h2></th>
                </tr>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">foto</th>
                    <th scope="col">Preço</th>
                </tr>
            </thead>
            {props.pedido.map((produto, index) => (
                    <tr key={index}>
                        <th scope="row"><h3>{produto.nome}</h3></th>
                        <td><img src={"http://localhost:9000" + produto.img} alt={produto.nome}></img></td>
                        <td><h4>{produto.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4></td>
                </tr>
            ))}
            <td colspan="2">O total é de</td>
            <td><h3>{total()}</h3></td>
        </table>
    </div>
}

export default Finalizado;