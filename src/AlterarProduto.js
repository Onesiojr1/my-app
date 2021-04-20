import React, { useState } from 'react';

const AlterarProduto = (props) => {
    const [form, setForm] = useState({});
    const [formImg, setFormImg] = useState();
    const [errors, setErrors] = useState({});

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    function handleImg(event) {
        setFormImg(event.target.files[0])
    }

    function validate() {
        let errors = {};
        if (!form.nome) {
            errors.nome = "*Preencha um nome válido"
        }

        if (!form.preco) {
            errors.preco = "*Preencha um Preço válido"
        }


        if (!form.categoria) {
            errors.categoria = "*Preencha com uma categoria válida"
        }

        if (!form.descricao) {
            errors.descricao = "*Preencha com uma descrição válida"
        }

        return errors;
    }

    function handleSubmit(event) {
        event.preventDefault();
        setErrors(validate(form))
        if (Object.entries(errors).length === 0) {
            sendData();
        }
    }

    async function sendData() {
        try {
            const formData = new FormData();
            if (formImg != null) { formData.append('img', formImg) } else {formData.append('img', null)}

            for (const [chave, valor] of Object.entries(form)) {
                formData.append(chave, valor)
            }
            console.log(formData);
            // const response = 
            await fetch('http://localhost:9000/produtos/update/' + props.atualizaProd._id, {
                method: 'PUT',
                body: formData
            })

            // await response.json()
            setForm({ formSent: true, nome: '', preco: '', descricao: '', img: '', categoria: '' });
            props.setProdutos([...props.produtos]);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            {!form.formSent ?
                <form className="formulario" onSubmit={e => handleSubmit(e)}>
                    <label for="nome">Nome</label>
                    <input name="nome" type="text" id="nome" placeholder={props.atualizaProd.nome} onChange={e => handleChange(e)} />
                    {errors.nome && <p className="error-input">{errors.nome}</p>}

                    <label for="preco">Preço</label>
                    <input name="preco" type="number" id="preco" placeholder={props.atualizaProd.preco} onChange={e => handleChange(e)} />
                    {errors.preco && <p className="error-input">{errors.preco}</p>}

                    <label for="descricao">Descrição</label>
                    <input name="descricao" type="text" id="descricao" placeholder={props.atualizaProd.descricao} onChange={e => handleChange(e)} />
                    {errors.descricao && <p className="error-input">{errors.descricao}</p>}

                    <label for="img">Imagem</label>
                    <input name="img" type="file" id="img" onChange={e => handleImg(e)} />
                    {errors.img && <p className="error-input">{errors.img}</p>}

                    <label for="categoria">Categoria</label>
                    <input name="categoria" type="text" id="categoria" placeholder={props.atualizaProd.categoria} onChange={e => handleChange(e)} />
                    {errors.categoria && <p className="error-input">{errors.categoria}</p>}

                    <button className="submit">Enviar</button>
                </form> : <h1>Formulario Enviado!</h1>
            }
        </div>
    )
}

export default AlterarProduto;