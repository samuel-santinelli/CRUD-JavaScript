'use strict';
import {openModal, closeModal} from './modal.js';
import {getProdutos, postProduto} from './produtos.js';
import {preview} from './preview.js';

{/* <tr>

</tr>  */}

const criarLinha = ({foto, nome, preco, categoria}) => {
    // Cria um elemento('') - dentro dos parenteses o elemento a ser criado
    const linha = document.createElement('tr')
    linha.innerHTML = ` 
    <td>
    <img src="${foto}" class="produto-image" />
        </td>
            <td>${nome}</td>
            <td>${preco}</td>
            <td>${categoria}</td>
        <td>
    <button type="button" class="button green">
        editar
    </button>
    <button type="button" class="button red">
        excluir
    </button>
</td>
    `;
    return linha;
};

const carregarProdutos = async () => {
    const container = document.querySelector('.records tbody');
    const produtos = await getProdutos();
    const linhas = produtos.map(criarLinha);
    container.replaceChildren(...linhas);
};

const imagemPreview = () => preview('inputFile', 'imagePreview')

const salvarProduto = () => {
    const produto = {
        nome: document.getElementById('product').value,
        preco: document.getElementById('price').value,
        categoria: document.getElementById('category').value,
        foto: document.getElementById('imagePreview').src
    };
    postProduto(produto);
    closeModal();
    carregarProdutos();
};
 
carregarProdutos();

// Eventos

document.getElementById('cadastrarCliente').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('cancel').addEventListener('click', closeModal);

document.getElementById('inputFile').addEventListener('change', imagemPreview);

document.getElementById('save').addEventListener('click', salvarProduto);