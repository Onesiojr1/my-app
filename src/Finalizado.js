import React from "react";

const Finalizado = (props) => {
    return <div>
        <h1>{props.generateOrderCode()}</h1>
        <table className="tabela">
            {/* {console.log(props.pedido)} */}
            {props.pedido.map((produto, index) => (
                <tr className="Produtos" >
                    <div key={index}>
                        <td><h3>{produto.nome}</h3></td>
                        <td><img src={"http://localhost:9000" + produto.img} alt={produto.nome}></img></td>
                        {/* <td><p>{produto.descricao}</p></td> */}
                        <td><h4>{produto.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4></td>
                    </div>
                </tr>
            ))}
        </table>
    </div>
}

export default Finalizado;