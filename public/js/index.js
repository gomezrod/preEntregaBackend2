import { $ } from "./utils.js";
const createProductForm = $('#createForm')

const socket = io();

socket.on('statusError', data => {
    console.log(data);
});

socket.on('publishProducts', data => {
    $('.products-box').innerHTML = '';

    let html = '';
    data.forEach(product => {
        html += `<div class="product-card">
                    <h3>${product.title}</h3>
                    <hr>
                    <p>Categoria: ${product.category}</p>
                    <p>Descripción: ${product.description}</p>
                    <p>Precio: $ ${product.price}</p>
                    <button id="button-delete" onclick="deleteProduct('${product._id}')">Eliminar</button>
                </div>`;
    });

    $('.products-box').innerHTML = html;
});

async function createProduct(event) {
    event.preventDefault();
    const newProduct = {
        title: $('#title').value,
        description: $('#description').value,
        code: $('#code').value,
        price: $('#price').value,
        stock: $('#stock').value,
        category: $('#category').value
    }
    
    const createProductResponse = await fetch('/api/products', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })

    const createProduct = await createProductResponse.json()

    if(createProduct.status === 'success'){
        alert('Producto creado correctamente')
    } else {
        alert('Error al crear el producto')
    }

    cleanForm();

    socket.emit('createProduct', newProduct);
}

if(createProductForm){
    createProductForm.addEventListener("submit", createProduct)
}

function deleteProduct(pid) {
    socket.emit('deleteProduct', { pid });
}

function cleanForm() {
    $('#title').value = '';
    $('#description').value = '';
    $('#code').value = '';
    $('#price').value = '';
    $('#stock').value = '';
    $('#category').value = '';
}