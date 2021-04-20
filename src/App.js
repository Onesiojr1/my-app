import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Carrinho from './Carrinho';
import Home from './Home';
import Header from './Header';
import Finalizado from "./Finalizado";
import Admin from "./Admin";
import NovoProduto from "./NovoProduto"
import AlterarProduto from "./AlterarProduto";

function App() {

  const [carrinho, setCarrinho] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [ordenacao, setOrdenacao] = useState('crescente');
  const [termoBusca, setTermoBusca] = useState("");
  const [pedido, setPedido] = useState([]);
  const [atualizaProd, setAtualizaProd] =useState([]);


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
      setProdutos([...produtos.sort((a, b) => b.preco - a.preco)]);
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

  const generateOrderCode = () => {
    const randomNumber = Math.floor(Math.random() * 10000);
    const random = randomNumber.toString().padStart(5, "0");
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = now.getMonth().toString().padStart(2, "0");
    const day = now.getDay().toString().padStart(2, "0");

    return `${year}${month}${day}${random}`;
  }

  const finalizar = () => {
    //Remover Carrinho
    setPedido(carrinho);
    setCarrinho([]);
  }

  async function remove(id) {
    await fetch('http://localhost:9000/produtos/delete/' + id, {
      method: 'DELETE'
    }).then(() => {
      setProdutos([...produtos.filter(produtos => produtos._id !== id)]);
      console.log('removed');
    }).catch(err => {
      console.error(err)
    });

  }

  // const teste = null;
  function atualizarProduto(produto) {
    setAtualizaProd(produto);
  }

  return <div className="App">
    <Router>
      <Header procuraProduto={procuraProduto} carrinho={carrinho} />
      <Route exact path='/Carrinho' render={(props) => <Carrinho {...props} carrinho={carrinho} removerCarrinho={removerCarrinho} setCarrinho={setCarrinho} finalizar={finalizar} />}></Route>
      <Route exact path='/' render={(props) => <Home handleSelect={handleSelect} produtos={produtos} ordenacao={ordenacao} termoBusca={termoBusca} adicinarCarrinho={adicinarCarrinho} />}></Route>
      <Route exact path='/Checkout' render={(props) => <Finalizado generateOrderCode={generateOrderCode} carrinho={carrinho} pedido={pedido} />}></Route>
      <Route exact path='/Admin' render={(props) => <Admin produtos={produtos} remove={remove} atualizarProduto={atualizarProduto} />}></Route>
      <Route exact path='/NovoProduto' render={(props) => <NovoProduto produtos={produtos} setProdutos={setProdutos} />}></Route>
      <Route path='/Update/:id' render={(props) => <AlterarProduto produtos={produtos} setProdutos={setProdutos} atualizaProd={atualizaProd}  />} />
    </Router>
  </div>
}

export default App;