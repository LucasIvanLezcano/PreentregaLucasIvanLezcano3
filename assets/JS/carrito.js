const carritoMostrar = JSON.parse(localStorage.getItem("carrito")) || []
console.log(carritoMostrar)

carritoMostrar.forEach((prod) => {
    console.log(prod.nombre)
})
let totalCarritoElement = document.querySelector('#totalCarrito');
let tablaBody = document.querySelector('#tablabody');
let numeroIcon = document.querySelector('#numero')

function numeroCarrito (){
    numeroIcon.innerHTML = `${carritoMostrar.length}`;
};


function actualizarCarrito(){
    const tabla = document.querySelector('#tablabody')
    tabla.innerHTML = '';
    carritoMostrar.forEach((prod)=> {
        const tr = document.createElement ('tr')
        tr.innerHTML = `<td>${prod.id}</td>
        <td>${prod.nombre}</td>
        <td>${prod.precio}</td>`
        tabla.appendChild(tr)
    })
}

function calcularTotalCarrito() {
    let total = 0;
    for (const producto of carritoMostrar) {
        total += producto.precio;
    }
    return total;
}
  
function actualizarTotalCarrito() {
    let totalCarrito = calcularTotalCarrito();
    totalCarritoElement.innerText = `Total: USD$${totalCarrito}`;
}

let finalizarBtn = document.getElementById('finalizar');

finalizarBtn.onclick = () => {
    Toastify({
        text: "Gracias por tu compra! Recibirás el pedido en los proximos dos dias habiles.",
        duration: 2000,
        gravity: 'top',
        position: 'right',
        close: true,
        style: {
            background: "linear-gradient(to right, #3c60c2, #FF5C64)",
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
