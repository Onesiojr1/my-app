import React from 'react';
import { Link } from 'react-router-dom';

const Admin = (props) => {

    // const teste = null;



    return <div>
        <Link to="/NovoProduto">Criar Novo Produto</Link>
        <table>
            {props.produtos.map(produto => (
                <tr>
                    <div key={produto._id}>
                        <td><h3>{produto.nome}</h3></td>
                        <td><div >Editar</div></td>
                        <td><div onClick={() => props.remove(produto._id)}>Deletar</div></td>
                    </div>
                </tr>
            ))}
        </table>
    </div>
}

export default Admin;