let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
console.log,(carrito)

let articulosCartas = document.querySelector('#cartas');
let tablaBody = document.querySelector('#tablabody');
let totalCarritoElement = document.querySelector('#totalCarrito');
let numeroIcon = document.querySelector('#numero')





for (const producto of productos){
    articulosCartas.innerHTML += `
    <div class="card"  style="width: 18rem;">
    <img src=${producto.foto} class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">Precio $ ${producto.precio}</p>
        <button id=${producto.id} class="btn btn-primary compra boton-agregar">Comprar</button>
    </div>
    </div>
    `;
}

let botones = document.getElementsByClassName('compra');
for (const boton of botones) {
    boton.addEventListener('click', () => {
        productoCarro = productos.find((prod) => prod.id == boton.id);
        sumarCarro(productoCarro);
        guardarCarritoEnLocalStorage();
        mostrarNotificacion(productoCarro.nombre);
    });
}
function numeroCarrito (){
    numeroIcon.innerHTML = `${carrito.length}`;
};


function sumarCarro(prod) {
    carrito.push(prod);
    console.log(carrito)
    numeroCarrito()
    actualizarCarrito()
    actualizarTotalCarrito();
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarCarrito(){
    const tabla = document.querySelector('#tablabody')
    tabla.innerHTML = '';
    carrito.forEach((prod)=> {
        const tr = document.createElement ('tr')
        tr.innerHTML = `<td>${prod.id}</td>
        <td>${prod.nombre}</td>
        <td>${prod.precio}</td>`
        tabla.appendChild(tr)
    })
}

function mostrarNotificacion(producto) {
    Toastify({
        text: `Se ha agregado "${producto}" al carrito.`,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
        stopOnFocus: true,
        offset: {
            x: 150, 
            y: 110 
        },
    }).showToast();
}


function calcularTotalCarrito() {
    let total = 0;
    for (const producto of carrito) {
        total += producto.precio;
    }
    return total;
}
  
function actualizarTotalCarrito() {
    let totalCarrito = calcularTotalCarrito();
    totalCarritoElement.innerText = `Total: USD$${totalCarrito}`;
}


//finalizar compra

let finalizarBtn = document.getElementById('finalizar');

finalizarBtn.onclick = () => {
    Toastify({
        text: "Gracias por tu compra! Recibirás el pedido en los proximos dos dias habiles.",
        duration: 2000,
        gravity: 'top',
        position: 'right',
        close: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        offset: {
            x: 150, 
            y: 110 
        },
    }).showToast();
    //vaciar carrito
    carrito = [];
    JSON.parse(localStorage.getItem('carrito')) || [];
    document.querySelector('#tablabody').innerHTML = ''
    numeroIcon.innerHTML = `${carrito.length}`;
    document.querySelector('#totalCarrito').innerText = `Total: USD$ `;
    
}

numeroCarrito()
actualizarCarrito()
