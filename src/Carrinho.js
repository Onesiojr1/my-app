import React from "react";
import { Link } from 'react-router-dom';


const Carrinho = (props) => {
  const removerCarrinho = (produto) => {
    props.removerCarrinho(produto);
  }

  const styleCor = {
    color: 'white'
  }


  const total = () => {
    const valor = props.carrinho.reduce((total, produtoAtual) => total + produtoAtual.preco, 0);
    const valorTotal = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    return valorTotal;
  }

  return <div>
    <h2>Carrinho</h2>
    <div className="Carrinho">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">foto</th>
            <th scope="col">Preço</th>
            <th scope="col">Excluir</th>
          </tr>
        </thead>

        {props.carrinho.map((produto, index) => (
          <tbody>
            <th scope="row" key={index} ><h3>{produto.nome}</h3></th>
            <td><img src={"http://localhost:9000" + produto.img} alt={produto.nome}></img></td>
            <td><h4>{produto.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4></td>
           <td><button type="button" class="btn btn-danger" onClick={() => removerCarrinho(produto)} >Remover</button></td>
          </tbody>
        ))}
        <tr>
          <td colspan="2">O total é de</td>
          <td><p>{total()}</p></td>
        </tr>

      </table>


    </div>



    <button type="button" class="btn btn-success"><Link to="/checkout"><div className="Finalizar" style={styleCor} onClick={() => props.finalizar()}>Finalizar Compra</div></Link></button>
  </div>
}

export default Carrinho;