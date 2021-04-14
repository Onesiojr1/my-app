import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Carrinho from './Carrinho';
import Home from './Home';
import Header from './Header';


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

  return <div className="App">
    <Router>
    <Header procuraProduto={procuraProduto} carrinho={carrinho} />
    <Route exact path='/Carrinho' render={(props) => <Carrinho {...props} carrinho={carrinho} removerCarrinho={removerCarrinho} />}></Route>
    <Route exact path='/' render={(props) => <Home handleSelect={handleSelect} produtos={produtos} ordenacao={ordenacao}  termoBusca={termoBusca} adicinarCarrinho={adicinarCarrinho} />}></Route>
    </Router>
    </div>
}

export default App;