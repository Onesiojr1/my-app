import React from 'react';

const Home = (props) => {

    const itemProduto = (produto) => {
        return (
            <div key={produto._id}>
                <h3>{produto.nome}</h3>
                <img src={"http://localhost:9000" + produto.img} alt={produto.nome}></img>
                <h4>{produto.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>
                <div onClick={() => props.adicinarCarrinho(produto)} >adicionar ao carrinho</div>
            </div>
        )
    }

    return <div>

        <select value={props.ordenacao} onChange={(e) => props.handleSelect(e)}>
            <option value={'crescente'}>Preço crescente</option>
            <option value={'decrescente'}>Preço decrescente</option>
        </select>

        {props.termoBusca === "" && (
            <div className="Destaque">
                <h1>Destaques</h1>
                <div className="Produtos">
                    {props.produtos.slice(0, 3).map(produto => (
                        <div key={produto._id}>
                            <h3>{produto.nome}</h3>
                            <img src={"http://localhost:9000" + produto.img} alt={produto.nome}></img>
                            <p>{produto.descricao}</p>
                            <h4>{produto.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>
                            <div onClick={() => props.adicinarCarrinho(produto)} >adicionar ao carrinho</div>
                        </div>
                    ))}
                </div>
            </div>
        )}

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