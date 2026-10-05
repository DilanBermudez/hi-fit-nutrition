// ==========================================
// HI FIT NUTRITION
// JavaScript - Carrito, menú y formulario
// ==========================================


// ==========================================
// CARRITO DE COMPRAS
// ==========================================

// Array donde se guardan los productos
const carrito = [];

// Variable que almacena el total
let total = 0;


// ==========================================
// ELEMENTOS DEL CARRITO
// ==========================================

const botonesAgregar = document.querySelectorAll(".btn-agregar");

const listaCarrito = document.getElementById("listaCarrito");

const totalElemento = document.getElementById("total");

const botonVaciar = document.getElementById("vaciarCarrito");

const contadorCarrito =
    document.getElementById("contadorCarrito");

const botonCarrito =
    document.getElementById("botonCarrito");

const carritoPanel =
    document.getElementById("carritoPanel");


// ==========================================
// ABRIR Y CERRAR CARRITO
// ==========================================

botonCarrito.addEventListener("click", function() {

    carritoPanel.classList.toggle("carrito-abierto");

});


// ==========================================
// MENÚ RESPONSIVE
// ==========================================

const menuBoton =
    document.getElementById("menuBoton");

const menu =
    document.getElementById("menu");


menuBoton.addEventListener("click", function() {

    menu.classList.toggle("menu-abierto");

});


// ==========================================
// AGREGAR PRODUCTOS
// ==========================================

botonesAgregar.forEach(function(boton) {

    boton.addEventListener("click", function() {

        // Obtener información del producto
        const id = boton.dataset.id;

        const nombre = boton.dataset.nombre;

        const precio =
            Number(boton.dataset.precio);


        // Agregar producto al carrito
        agregarAlCarrito(
            id,
            nombre,
            precio
        );

    });

});


// ==========================================
// FUNCIÓN AGREGAR AL CARRITO
// ==========================================

function agregarAlCarrito(id, nombre, precio) {

    const producto = {

        id: id,

        nombre: nombre,

        precio: precio

    };


    // Agregar producto al array
    carrito.push(producto);


    // Actualizar el total
    total = total + precio;


    // Mostrar nuevamente el carrito
    mostrarCarrito();
}


// ==========================================
// MOSTRAR CARRITO
// ==========================================

function mostrarCarrito() {

    // Limpiar el contenido anterior
    listaCarrito.innerHTML = "";


    // Comprobar si el carrito está vacío
    if (carrito.length === 0) {

        const mensaje =
            document.createElement("p");

        mensaje.textContent =
            "Tu carrito está vacío.";

        listaCarrito.appendChild(mensaje);

        totalElemento.textContent = "0";

        contadorCarrito.textContent = "0";

        return;
    }


    // Recorrer todos los productos
    carrito.forEach(function(producto) {

        // Crear un elemento div
        const elemento =
            document.createElement("div");


        elemento.classList.add(
            "item-carrito"
        );


        // Crear el nombre y precio
        const informacion =
            document.createElement("span");


        informacion.textContent =
            producto.nombre +
            " - $" +
            producto.precio.toLocaleString("es-CO");


        // Crear botón eliminar
        const botonEliminar =
            document.createElement("button");


        botonEliminar.textContent =
            "Eliminar";


        botonEliminar.classList.add(
            "btn-eliminar"
        );


        // Evento para eliminar
        botonEliminar.addEventListener(
            "click",
            function() {

                eliminarDelCarrito(
                    producto.id
                );

            }
        );


        // Agregar elementos al div
        elemento.appendChild(
            informacion
        );

        elemento.appendChild(
            botonEliminar
        );


        // Agregar el producto al carrito visual
        listaCarrito.appendChild(
            elemento
        );

    });


    // Mostrar el total
    totalElemento.textContent =
        total.toLocaleString("es-CO");


    // Actualizar contador
    contadorCarrito.textContent =
        carrito.length;
}


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

function eliminarDelCarrito(id) {

    // Buscar la posición del producto
    const indice =
        carrito.findIndex(function(producto) {

            return producto.id === id;

        });


    // Comprobar que el producto exista
    if (indice !== -1) {

        // Restar el precio del producto
        total =
            total -
            carrito[indice].precio;


        // Eliminar el producto del array
        carrito.splice(indice, 1);


        // Actualizar el carrito
        mostrarCarrito();
    }
}


// ==========================================
// VACIAR CARRITO
// ==========================================

botonVaciar.addEventListener(
    "click",
    function() {

        // Vaciar el array
        carrito.length = 0;


        // Reiniciar el total
        total = 0;


        // Actualizar el carrito
        mostrarCarrito();

    }
);


// ==========================================
// VALIDACIÓN DEL FORMULARIO
// ==========================================

// Obtener el formulario
const formulario =
    document.getElementById("formulario");


// Obtener los campos
const nombre =
    document.getElementById("nombre");

const correo =
    document.getElementById("correo");

const mensaje =
    document.getElementById("mensaje");


// Detectar el envío del formulario
formulario.addEventListener(
    "submit",
    function(event) {

        // Evitar que la página se recargue
        event.preventDefault();


        // Obtener los valores escritos
        const nombreValor =
            nombre.value.trim();

        const correoValor =
            correo.value.trim();

        const mensajeValor =
            mensaje.value.trim();


        // ======================================
        // VALIDAR CAMPOS VACÍOS
        // ======================================

        if (
            nombreValor === "" ||
            correoValor === "" ||
            mensajeValor === ""
        ) {

            alert(
                "Por favor, completa todos los campos."
            );

            return;
        }


        // ======================================
        // VALIDAR CORREO
        // ======================================

        const formatoCorreo =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !formatoCorreo.test(correoValor)
        ) {

            alert(
                "Por favor, escribe un correo electrónico válido."
            );

            return;
        }


        // ======================================
        // FORMULARIO CORRECTO
        // ======================================

        alert(
            "¡Gracias por contactarnos, " +
            nombreValor +
            "!"
        );


        // Limpiar formulario
        formulario.reset();

    }
);