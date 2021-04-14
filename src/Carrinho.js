import React from "react";

const Carrinho = (props) => {
    console.log(props)
    // return <p>Aqui</p>
    const removerCarrinho = (produto) => {
        props.removerCarrinho(produto);
      }
    return <div className="Carrinho">
      <h2>Carrinho</h2>
      {props.carrinho.map((produto, index) => (
        <div key={index}>
          <h3>{produto.nome}</h3>
          <img src={"http://localhost:9000" + produto.img} alt={produto.nome}></img>
          <p>{produto.descricao}</p>
          <h4>{produto.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>
          <div onClick={() => removerCarrinho(produto)} >Remover</div>
        </div>
      ))}
    </div>
    
}

export default Carrinho;