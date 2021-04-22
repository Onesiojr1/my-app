import React, { useState } from 'react';

const NovoProduto = (props) => {

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

        if (!formImg) {
            errors.img = "*Preencha com uma imagem válida"
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
            console.log(Object.entries(errors).length)
            sendData();
        }
    }

    async function sendData() {
        // 🥵
        try {
            const formData = new FormData()
            formData.append('img', formImg)
            for (const [chave, valor] of Object.entries(form)) {
                formData.append(chave, valor)
            }
            const response = await fetch('http://localhost:9000/produtos', {
                method: 'POST',
                body: formData
            })

            const novoProduto = await response.json()
            setForm({ formSent: true, nome: '', preco: '', descricao: '', img: '', categoria: '' });
            props.setProdutos([...props.produtos, novoProduto]);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            {!form.formSent ?
                <form className="formulario" class="center-block" onSubmit={e => handleSubmit(e)}>
                    <div class="row justify-content-center">
                        <div class="form-group col-4">
                            <label for="nome">Nome</label>
                            <input name="nome" type="text" id="nome" class="form-control" onChange={e => handleChange(e)} />
                            {errors.nome && <p className="error-input">{errors.nome}</p>}
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="form-group col-4">
                            <label for="preco">Preço</label>
                            <input name="preco" type="number" id="preco" class="form-control" step="0.01" onChange={e => handleChange(e)} />
                            {errors.preco && <p className="error-input">{errors.preco}</p>}
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="form-group col-4">
                            <label for="descricao">Descrição</label>
                            <input name="descricao" type="text" id="descricao" class="form-control" onChange={e => handleChange(e)} />
                            {errors.descricao && <p className="error-input">{errors.descricao}</p>}
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="form-group col-4">
                            <label for="img">Imagem</label>
                            <input name="img" type="file" class="form-control-file" id="img" onChange={e => handleImg(e)} />
                            {errors.img && <p className="error-input">{errors.img}</p>}
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="form-group col-4">
                            <label for="categoria">Categoria</label>
                            <input name="categoria" type="text" id="categoria" class="form-control" onChange={e => handleChange(e)} />
                            {errors.categoria && <p className="error-input">{errors.categoria}</p>}
                        </div>
                    </div>

                    <button type="submit" class="btn btn-success" >Enviar</button>
                </form> : <h1>Formulario Enviado!</h1>
            }
        </div>
    )
}


export default NovoProduto;