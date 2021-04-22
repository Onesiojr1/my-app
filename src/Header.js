import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {

  const styleCor = {
    color: 'white'
  }

    return <div>
    <header className="Cabecalho">
    <Link to='/'><img src="..\img\logo2.jpg" alt="Logo"></img></Link>
    <div className="pesquisa">
      <input type="text" onChange={(e) => props.procuraProduto(e)} />
    </div>
    <button type="button" class="btn btn-primary"><Link to='/Carrinho' style={styleCor}>Carrinho ({props.carrinho.length})</Link> </button>
  </header>
  </div>
}

export default Header;