import React, { useEffect, useState } from "react";
import './App.css';


function App() {

  const [carrinho, setCarrinho] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [ordenacao, setOrdenacao] = useState('crescente');
  const [termoBusca, setTermoBusca] = useState("");


  useEffect(() => {
    fetch("http://localhost:9000/produtos")
      .then(res => res.json())
      .then(res => setProdutos([...res]));
  }, [])

  const handleSelect = (e) => {
    const order = e.target.value;
    setOrdenacao(order);

    if (order === 'crescente') {
      setProdutos([...produtos.sort((a, b) => a.preco - b.preco)]);
    }

    if (order === 'decrescente') {
      setProdutos([...produtos.sort((a, b) =>b.preco - a.preco )]);
    }
  }

  const adicinarCarrinho = (produto) => {
    setCarrinho([...carrinho, { ...produto }]);
  }

  const removerCarrinho = (produto) => {
    setCarrinho(carrinho.filter(produtoCarrinho => produtoCarrinho !== produto));
  }

  const procuraProduto = (e) => {
    setTermoBusca(e.target.value);
  } 

  const itemProduto = (produto) => {
    return (
      <div>
        <h3>{produto.nome}</h3>
        <img src={"http://localhost:9000" + produto.img} alt={produto.nome}></img>
        <h4>{produto.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>
        <div onClick={() => adicinarCarrinho(produto)} >adicionar ao carrinho</div>
      </div>
    )
  }

  return <div className="App">
    <header className="Cabecalho">
      <img src="..\img\logo2.jpg" alt="Logo"></img>
      <div className="pesquisa">
        <input type="text" onChange={(e) => procuraProduto(e)} />
        <button> Pesquisar</button>
      </div>
      <button> Carrinho ({carrinho.length})</button>
    </header>

    { termoBusca === "" && (
      <div className="Destaque">
        <h1>Destaques</h1>
        <div className="Produtos">
          {produtos.slice(0, 3).map(produto => (
            <div>
              <h3>{produto.nome}</h3>
              <img src={"http://localhost:9000" + produto.img} alt={produto.nome}></img>
              <p>{produto.descricao}</p>
              <h4>{produto.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>
              <div onClick={() => adicinarCarrinho(produto)} >adicionar ao carrinho</div>
            </div>
          ))}
        </div>
      </div>
    )}
    
    <div className="lista">
      <select value={ordenacao} onChange={(e) => handleSelect(e)}>
        <option value={'crescente'}>Preço crescente</option>
        <option value={'decrescente'}>Preço decrescente</option>
      </select>
      <div className="produtos"> 
        { termoBusca === "" 
          ? produtos.slice(3, produtos.length).map(itemProduto)
          : produtos.filter((produto) => {
              const busca = termoBusca.toLowerCase()
              const nome = produto.nome.toLowerCase()
              const categoria = produto.categoria.toLowerCase()
              return nome.includes(busca) || categoria.includes(busca)
            }).map(itemProduto)
        }
      </div>
    </div>

    <div className="Carrinho">
      <h2>Carrinho</h2>
      <div className="Produtos">
        {carrinho.map(produto => (
          <div>
            <h3>{produto.nome}</h3>
            <img src={"http://localhost:9000" + produto.img} alt={produto.nome}></img>
            <p>{produto.descricao}</p>
            <h4>{produto.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>
            <div onClick={() => removerCarrinho(produto)} >Remover</div>
          </div>
        ))}
      </div>
    </div>
  </div>
}

export default App;