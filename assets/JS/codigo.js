let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
console.log,(carrito)

let articulosCartas = document.querySelector('#cartas');
let numeroIcon = document.querySelector('#numero')





for (const producto of productos){
    articulosCartas.innerHTML += `
    <div class="card"  style="width: 18rem;">
    <img src=${producto.foto} class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">Precio $ ${producto.precio}</p>
        <button id=${producto.id} class="btn2 btn-primary compra boton-agregar">Comprar</button>
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
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
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













//filtracion

const categoriaBtns = document.querySelectorAll('.categoria-btn');


categoriaBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const categoriaSeleccionada = btn.textContent.trim();

        // Filtra los productos por la categoría seleccionada
        const productosFiltrados = productos.filter((producto) => producto.categoria === categoriaSeleccionada);

        // Limpia el contenido actual de la sección de productos
        articulosCartas.innerHTML = '';

    
        for (const producto of productosFiltrados) {
            articulosCartas.innerHTML += `
            <div class="card"  style="width: 18rem;">
                <img src=${producto.foto} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio $ ${producto.precio}</p>
                    <button id=${producto.id} class="btn2 btn-primary compra boton-agregar">Comprar</button>
                </div>
            </div>
            `;
        }

        

        // Actualiza los eventos click de los botones "Comprar" en los productos filtrados
        const nuevosBotones = document.getElementsByClassName('compra');
        for (const nuevoBoton of nuevosBotones) {
            nuevoBoton.addEventListener('click', () => {
                productoCarro = productos.find((prod) => prod.id == nuevoBoton.id);
                sumarCarro(productoCarro);
                guardarCarritoEnLocalStorage();
                mostrarNotificacion(productoCarro.nombre);
            });
        }
    });
});
