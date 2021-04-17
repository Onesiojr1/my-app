import React from "react";
import { Link } from 'react-router-dom';


const Carrinho = (props) => {
  const removerCarrinho = (produto) => {
    props.removerCarrinho(produto);
  }

  const total = () => {
    const valor = props.carrinho.reduce((total, produtoAtual) => total + produtoAtual.preco, 0);
    const valorTotal = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    return valorTotal;
  }

  return <div>
    <h2>Carrinho</h2>
    <div className="Carrinho">
      {props.carrinho.map((produto, index) => (
        <div className="Produtos" >
          <div key={index}>
            <h3>{produto.nome}</h3>
            <img src={"http://localhost:9000" + produto.img} alt={produto.nome}></img>
            <p>{produto.descricao}</p>
            <h4>{produto.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>
            <div onClick={() => removerCarrinho(produto)} >Remover</div>
          </div>
        </div>
      ))}
      <p>{total()}</p>
    </div>
    


    <Link to="/checkout"><div className="Finalizar" onClick={() => props.finalizar()}>Finalizar Compra</div></Link>
  </div>
}

export default Carrinho;