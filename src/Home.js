import React from 'react';

const Home = (props) => {

    const styleCor = {
        color: 'white'
    }


    const itemProduto = (produto) => {
        return (
            <div className="produto" key={produto._id}>
                <h3>{produto.nome}</h3>
                <img src={"http://localhost:9000" + produto.img} alt={produto.nome}></img>
                <div className="info">
                    <h4>{produto.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>
                    <button type="button" class="btn btn-success" onClick={() => props.adicinarCarrinho(produto)} >adicionar ao carrinho</button>
                </div>
            </div>
        )
    }

    return <div>

        <select className="select" value={props.ordenacao} onChange={(e) => props.handleSelect(e)}>
            <option value={'crescente'}>Preço crescente</option>
            <option value={'decrescente'}>Preço decrescente</option>
        </select>

        {props.termoBusca === "" && (
            <div className="Destaque">
                <h1>Destaques</h1>
                <div className="Produtos">
                    {props.produtos.slice(0, 3).map(produto => (
                        <div className="produto" key={produto._id}>
                            <h2>{produto.nome}</h2>
                            <img src={"http://localhost:9000" + produto.img} alt={produto.nome}></img>
                            <h4>{produto.descricao}</h4>
                            <div className="Info">
                                <h3 style={styleCor}>{produto.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h3>
                                <button type="button" class="btn btn-success" onClick={() => props.adicinarCarrinho(produto)} >adicionar ao carrinho</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        <h2>Produtos</h2>

        <div className="lista">
            <div className="produtos">
                {props.termoBusca === ""
                    ? props.produtos.slice(3, props.produtos.length).map(itemProduto)
                    : props.produtos.filter((produto) => {
                        const busca = props.termoBusca.toLowerCase()
                        const nome = produto.nome.toLowerCase()
                        const categoria = produto.categoria.toLowerCase()
                        return nome.includes(busca) || categoria.includes(busca)
                    }).map(itemProduto)
                }
            </div>
        </div>
    </div>
}

export default Home;