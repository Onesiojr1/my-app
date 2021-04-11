import React, { useState } from "react";
import './App.css';


function App() {

  const [carrinho, setCarrinho] = useState([]);

  const [produtos, setProdutos] = useState([
    {
      nome: "Smash Supremo",
      preco: 19.90,
      img: "/img/Smash.png"
    },
    {
      nome: "Cheddar Melt",
      preco: 17.90,
      img: "/img/Smash.png"
    },
    {
      nome: "Caaaaaaaa",
      preco: 15.90,
      img: "/img/Smash.png"
    }
  ]);

  const ordenarProdutos = (produtos) => {
    setProdutos([...produtos.sort((a,b) => a.preco - b.preco )])
  }

  const adicinarCarrinho = (produtos) => {
    setCarrinho([...carrinho, produtos]);
  }

  return <div className="App">
    <header className="Cabecalho">
      <img src="..\img\logo2.jpg" alt="Logo"></img>
      <div className="pesquisa">
      <input type="text" value="O que procura?" />
      <button> Pesquisar</button>
      </div>
      <button> Carrinho ({carrinho.length})</button>
    </header>

    <div className="Destaque">
      <h1>Destaques</h1>
      <div className="Produtos">
        {produtos.slice(0,3).map(produto => (
          <div>
            <h3>{produto.nome}</h3>
            <img src={produto.img} alt="Smash"></img>
            <h4>{produto.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h4>
            <div onClick={() => adicinarCarrinho(produtos)} >adicionar ao carrinho</div>
          </div>
        ))}
      </div>
    </div>

    <div className="lista">
      <div className="ordenar" onClick={() => ordenarProdutos(produtos)}>Ordenar Preços</div>
    {produtos.slice(3, produtos.length).map(produto => (
          <div>
            <h3>{produto.nome}</h3>
            <img src={produto.img} alt="Smash"></img>
            <h4>{produto.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h4>
            <div onClick={() => adicinarCarrinho(produtos)} >adicionar ao carrinho</div>
          </div>
        ))}
    </div>
  </div>
}

export default App;