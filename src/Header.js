import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return <div>
    <header className="Cabecalho">
    <Link to='/'><img src="..\img\logo2.jpg" alt="Logo"></img></Link>
    <div className="pesquisa">
      <input type="text" onChange={(e) => props.procuraProduto(e)} />
    </div>
    <Link to='/Carrinho'>Carrinho ({props.carrinho.length})</Link> 
  </header>
  </div>
}

export default Header;