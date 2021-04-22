import React from 'react';
import { Link } from 'react-router-dom';

const Admin = (props) => {

    const styleCor = {
        color: 'white'
    }



    return <div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Excluir</th>
                </tr>
            </thead>
            <tbody>
                {props.produtos.map(produto => (
                    <tr key={produto._id}>
                        <th scope="row"><h3>{produto.nome}</h3></th>
                        <td><button type="button" class="btn btn-primary"><Link to={`/update/${produto._id}`} onClick={() => props.atualizarProduto(produto)} style={styleCor}>Editar</Link></button></td>
                        <td ><button type="button" class="btn btn-danger" onClick={() => props.remove(produto._id)}>Deletar</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button type="button" class="btn btn-success"><Link to="/NovoProduto" style={styleCor}>Criar Novo Produto</Link></button>
    </div >
}

export default Admin;