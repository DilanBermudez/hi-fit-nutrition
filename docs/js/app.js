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

// ==========================================
// CALCULADORA / RECOMENDADOR DE SUPLEMENTOS
// ==========================================

const btnRecomendar = document.getElementById("btnRecomendar");
const objetivoSelect = document.getElementById("objetivoSelect");
const resultadoRecomendacion = document.getElementById("resultadoRecomendacion");

if (btnRecomendar) {
    btnRecomendar.addEventListener("click", function() {
        const objetivo = objetivoSelect.value;
        let recomendacion = {};

        // Definir la recomendación según el selector
        if (objetivo === "volumen") {
            recomendacion = { 
                id: "1", 
                nombre: "Proteína Whey", 
                precio: 120000, 
                desc: "Ideal para aportar los aminoácidos necesarios y estimular la síntesis proteica." 
            };
        } else if (objetivo === "fuerza") {
            recomendacion = { 
                id: "2", 
                nombre: "Creatina", 
                precio: 80000, 
                desc: "Perfecta para incrementar tus reservas de fosfocreatina y mejorar la fuerza máxima." 
            };
        } else {
            recomendacion = { 
                id: "3", 
                nombre: "Aminoácidos", 
                precio: 65000, 
                desc: "Esenciales para frenar el desgaste muscular y acelerar la recuperación post-entreno." 
            };
        }

        // Pintar la recomendación en pantalla con un botón para agregar al carrito existente
        resultadoRecomendacion.innerHTML = `
            <div style="background: #eef2ff; padding: 1rem; border-radius: 6px; border-left: 4px solid #007bff;">
                <h4 style="margin: 0 0 0.3rem 0; color: #1e3a8a;">Sugerencia: ${recomendacion.nombre} ($${recomendacion.precio.toLocaleString("es-CO")})</h4>
                <p style="font-size: 0.85rem; color: #4b5563; margin: 0 0 0.8rem 0;">${recomendacion.desc}</p>
                <button id="btnAgregarRecomendado" class="btn-agregar" style="background: #10b981; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; font-weight: bold; cursor: pointer;">
                    Añadir al carrito
                </button>
            </div>
        `;

        // Conectar el botón generado al sistema de carrito que ya tienes en app.js
        document.getElementById("btnAgregarRecomendado").addEventListener("click", function() {
            agregarAlCarrito(recomendacion.id, recomendacion.nombre, recomendacion.precio);
            
            // Opcional: Abrir automáticamente el panel del carrito para que el usuario vea su producto agregado
            carritoPanel.classList.add("carrito-abierto");
        });
    });

/* ==========================================
   WEB APP: CALCULADORA NUTRICIONAL
   ========================================== */

const formularioCalculadora =
    document.getElementById("formularioCalculadora");

const pesoUsuario =
    document.getElementById("pesoUsuario");

const objetivoSelect =
    document.getElementById("objetivoSelect");

const resultadoRecomendacion =
    document.getElementById("resultadoRecomendacion");


if (formularioCalculadora) {
    formularioCalculadora.addEventListener("submit", function(event) {
        event.preventDefault();

        const peso = Number(pesoUsuario.value);
        const objetivo = objetivoSelect.value;

        if (!Number.isFinite(peso) || peso < 20 || peso > 300) {
            resultadoRecomendacion.innerHTML = `
                <div class="resultado-card" role="alert">
                    Introduce un peso válido entre 20 y 300 kg.
                </div>
            `;
            return;
        }

        // Estimación general para adultos físicamente activos.
        const proteinaMinima = Math.round(peso * 1.4);
        const proteinaMaxima = Math.round(peso * 2.0);

        let recomendacion;

        if (objetivo === "volumen") {
            recomendacion = {
                id: "1",
                nombre: "Proteína Whey",
                precio: 120000,
                descripcion:
                    "Una opción práctica para complementar la proteína que consumes en tu alimentación."
            };
        } else if (objetivo === "fuerza") {
            recomendacion = {
                id: "2",
                nombre: "Creatina",
                precio: 80000,
                descripcion:
                    "La creatina monohidratada es un suplemento estudiado para apoyar el rendimiento en esfuerzos de alta intensidad."
            };
        } else {
            recomendacion = {
                id: "3",
                nombre: "Aminoácidos",
                precio: 65000,
                descripcion:
                    "Antes de elegir un suplemento, revisa si cubres tus necesidades nutricionales con tu alimentación habitual."
            };
        }

        resultadoRecomendacion.innerHTML = `
            <div class="resultado-card">
                <h3>Tu resultado</h3>

                <p>
                    Para un peso de
                    <strong>${peso.toLocaleString("es-CO")} kg</strong>,
                    el rango orientativo calculado es:
                </p>

                <p class="resultado-proteina">
                    ${proteinaMinima}–${proteinaMaxima} g/día
                </p>

                <p>
                    Es una estimación general para adultos físicamente
                    activos, no una cantidad personalizada.
                </p>

                <div class="resultado-producto">
                    <h3>Producto para explorar</h3>

                    <strong>${recomendacion.nombre}</strong>

                    <p>
                        ${recomendacion.descripcion}
                    </p>

                    <p>
                        Precio:
                        <strong>
                            $${recomendacion.precio.toLocaleString("es-CO")}
                        </strong>
                    </p>

                    <button
                        type="button"
                        id="btnAgregarRecomendado"
                        class="btn-recomendado"
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;

        const botonRecomendado =
            document.getElementById("btnAgregarRecomendado");

        botonRecomendado.addEventListener("click", function() {
            agregarAlCarrito(
                recomendacion.id,
                recomendacion.nombre,
                recomendacion.precio
            );

            // Abrir el carrito existente para mostrar el resultado.
            if (carritoPanel) {
                carritoPanel.classList.add("carrito-abierto");
            }
        });
    });
}
}