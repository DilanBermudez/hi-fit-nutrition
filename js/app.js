
 // ==========================================
 // HI FIT NUTRITION
 // Carrito, menú, contacto y registro
 // ==========================================


// ==========================================
// 1. CARRITO DE COMPRAS
// ==========================================

const carrito = [];
let total = 0;

const botonesAgregar = document.querySelectorAll(".btn-agregar");
const listaCarrito = document.getElementById("listaCarrito");
const totalElemento = document.getElementById("total");
const botonVaciar = document.getElementById("vaciarCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const botonCarrito = document.getElementById("botonCarrito");
const carritoPanel = document.getElementById("carritoPanel");

// Abrir y cerrar carrito
botonCarrito.addEventListener("click", function() {
    carritoPanel.classList.toggle("carrito-abierto");
});

// Agregar productos
botonesAgregar.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const id = boton.dataset.id;
        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);

        agregarAlCarrito(id, nombre, precio);
    });
});

// Agregar al carrito
function agregarAlCarrito(id, nombre, precio) {
    const producto = {
        id: id,
        nombre: nombre,
        precio: precio
    };

    carrito.push(producto);
    total = total + precio;

    mostrarCarrito();
}

// Mostrar carrito
function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Tu carrito está vacío.";

        listaCarrito.appendChild(mensaje);

        totalElemento.textContent = "0";
        contadorCarrito.textContent = "0";

        return;
    }

    carrito.forEach(function(producto, indice) {
        const elemento = document.createElement("div");
        elemento.classList.add("item-carrito");

        const informacion = document.createElement("span");

        informacion.textContent =
            producto.nombre + " - $" +
            producto.precio.toLocaleString("es-CO");

        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("btn-eliminar");

        botonEliminar.addEventListener("click", function() {
            eliminarDelCarrito(indice);
        });

        elemento.appendChild(informacion);
        elemento.appendChild(botonEliminar);

        listaCarrito.appendChild(elemento);
    });

    totalElemento.textContent = total.toLocaleString("es-CO");
    contadorCarrito.textContent = carrito.length;
}

// Eliminar un producto específico
function eliminarDelCarrito(indice) {
    if (indice >= 0 && indice < carrito.length) {
        total = total - carrito[indice].precio;

        carrito.splice(indice, 1);

        mostrarCarrito();
    }
}

// Vaciar carrito
botonVaciar.addEventListener("click", function() {
    carrito.length = 0;
    total = 0;

    mostrarCarrito();
});


// ==========================================
// 2. MENÚ RESPONSIVE
// ==========================================

const menuBoton = document.getElementById("menuBoton");
const menu = document.getElementById("menu");

menuBoton.addEventListener("click", function() {
    menu.classList.toggle("menu-abierto");
});


// ==========================================
// 3. FORMULARIO DE CONTACTO
// ==========================================

const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreValor = nombre.value.trim();
    const correoValor = correo.value.trim();
    const mensajeValor = mensaje.value.trim();

    if (
        nombreValor === "" ||
        correoValor === "" ||
        mensajeValor === ""
    ) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correoValor)) {
        alert("Por favor, escribe un correo electrónico válido.");
        return;
    }

    alert("¡Gracias por contactarnos, " + nombreValor + "!");
    formulario.reset();
});


// ==========================================
// 4. REGISTRO DE CLIENTES
// ==========================================

// Obtener elementos del formulario de registro
const formularioRegistro =
    document.getElementById("formularioRegistro");

const nombreRegistro =
    document.getElementById("nombreRegistro");

const correoRegistro =
    document.getElementById("correoRegistro");

const telefonoRegistro =
    document.getElementById("telefonoRegistro");

const passwordRegistro =
    document.getElementById("passwordRegistro");

const confirmacionRegistro =
    document.getElementById("confirmacionRegistro");

const mensajeRegistro =
    document.getElementById("mensajeRegistro");

// Nombre que usaremos para guardar los registros
const claveUsuarios = "hiFitUsuarios";

// Mostrar mensajes en el formulario
function mostrarMensajeRegistro(texto, tipo) {
    mensajeRegistro.textContent = texto;
    mensajeRegistro.className = "mensaje-registro " + tipo;
}

// Leer usuarios guardados
function obtenerUsuarios() {
    try {
        const datos = localStorage.getItem(claveUsuarios);
        const usuarios = datos ? JSON.parse(datos) : [];

        return Array.isArray(usuarios) ? usuarios : [];
    } catch (error) {
        return null;
    }
}

// Convertir texto a SHA-256 usando una sal aleatoria
async function crearHashPassword(password, sal) {
    const contenido = sal + password;
    const datos = new TextEncoder().encode(contenido);

    const resultado = await crypto.subtle.digest("SHA-256", datos);

    return Array.from(new Uint8Array(resultado))
        .map(function(byte) {
            return byte.toString(16).padStart(2, "0");
        })
        .join("");
}

// Escuchar el envío del formulario
formularioRegistro.addEventListener("submit", async function(event) {
    event.preventDefault();

    // Obtener y limpiar los datos
    const nombreValor = nombreRegistro.value.trim();
    const correoValor = correoRegistro.value.trim().toLowerCase();
    const telefonoValor = telefonoRegistro.value.trim();
    const passwordValor = passwordRegistro.value;
    const confirmacionValor = confirmacionRegistro.value;

    // Validar campos vacíos
    if (
        nombreValor === "" ||
        correoValor === "" ||
        telefonoValor === "" ||
        passwordValor === "" ||
        confirmacionValor === ""
    ) {
        mostrarMensajeRegistro(
            "Por favor, completa todos los campos.",
            "error"
        );
        return;
    }

    // Validar nombre
    if (nombreValor.length < 3) {
        mostrarMensajeRegistro(
            "El nombre debe tener al menos 3 caracteres.",
            "error"
        );
        return;
    }

    // Validar correo
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correoValor)) {
        mostrarMensajeRegistro(
            "Escribe un correo electrónico válido.",
            "error"
        );
        return;
    }

    // Validar teléfono
    const formatoTelefono = /^[0-9+() -]{7,15}$/;

    if (!formatoTelefono.test(telefonoValor)) {
        mostrarMensajeRegistro(
            "Escribe un teléfono válido de 7 a 15 caracteres.",
            "error"
        );
        return;
    }

    // Validar contraseña
    if (passwordValor.length < 8) {
        mostrarMensajeRegistro(
            "La contraseña debe tener al menos 8 caracteres.",
            "error"
        );
        return;
    }

    // Confirmar contraseña
    if (passwordValor !== confirmacionValor) {
        mostrarMensajeRegistro(
            "Las contraseñas no coinciden.",
            "error"
        );
        return;
    }

    // Comprobar que el navegador tenga las herramientas de hash
    if (
        !window.crypto ||
        !window.crypto.subtle ||
        !window.crypto.getRandomValues
    ) {
        mostrarMensajeRegistro(
            "Abre la página mediante HTTPS o un servidor local para completar el registro.",
            "error"
        );
        return;
    }

    // Leer usuarios existentes
    const usuarios = obtenerUsuarios();

    if (usuarios === null) {
        mostrarMensajeRegistro(
            "No se pudieron leer los registros guardados.",
            "error"
        );
        return;
    }

    // Evitar correos duplicados
    const correoExiste = usuarios.some(function(usuario) {
        return usuario.correo === correoValor;
    });

    if (correoExiste) {
        mostrarMensajeRegistro(
            "Este correo ya está registrado.",
            "error"
        );
        return;
    }

    try {
        // Crear sal aleatoria para la contraseña
        const bytesSal = new Uint8Array(16);
        crypto.getRandomValues(bytesSal);

        const sal = Array.from(bytesSal)
            .map(function(byte) {
                return byte.toString(16).padStart(2, "0");
            })
            .join("");

        // Guardar el hash, nunca la contraseña directamente
        const passwordHash = await crearHashPassword(
            passwordValor,
            sal
        );

        // Crear objeto del usuario
        const nuevoUsuario = {
            id: Date.now(),
            nombre: nombreValor,
            correo: correoValor,
            telefono: telefonoValor,
            sal: sal,
            passwordHash: passwordHash,
            fechaRegistro: new Date().toISOString()
        };

        // Guardar usuario en localStorage
        usuarios.push(nuevoUsuario);

        localStorage.setItem(
            claveUsuarios,
            JSON.stringify(usuarios)
        );

        // Mostrar confirmación
        mostrarMensajeRegistro(
            "¡Registro exitoso, " + nombreValor +
            "! Ya formas parte de Hi Fit Nutrition.",
            "exito"
        );

        // Limpiar formulario
        formularioRegistro.reset();

    } catch (error) {
        mostrarMensajeRegistro(
            "No se pudo guardar el registro. Revisa el almacenamiento del navegador e inténtalo de nuevo.",
            "error"
        );
    }
});

/* =========================
   5. MENÚ DE CUENTA HEADER
   ========================= */

const botonCuenta = document.getElementById("botonCuenta");
const cuentaPanel = document.getElementById("cuentaPanel");
const enlaceCrearCuenta = document.getElementById("enlaceCrearCuenta");
const enlaceMiCuenta = document.getElementById("enlaceMiCuenta");
const datosCuenta = document.getElementById("datosCuenta");

// Abrir y cerrar el menú
botonCuenta.addEventListener("click", function() {
    const abierto = cuentaPanel.classList.toggle("cuenta-abierta");

    botonCuenta.setAttribute("aria-expanded", String(abierto));
});

// Ir al registro y cerrar el menú
enlaceCrearCuenta.addEventListener("click", function() {
    cuentaPanel.classList.remove("cuenta-abierta");
    botonCuenta.setAttribute("aria-expanded", "false");
});

// Consultar los datos guardados
enlaceMiCuenta.addEventListener("click", function() {
    datosCuenta.hidden = false;
    datosCuenta.replaceChildren();

    let usuarios;

    try {
        usuarios = JSON.parse(
            localStorage.getItem("hiFitUsuarios") || "[]"
        );
    } catch (error) {
        usuarios = [];
    }

    if (!Array.isArray(usuarios) || usuarios.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Todavía no hay clientes registrados.";
        datosCuenta.appendChild(aviso);
        return;
    }

    // Para esta demostración, mostramos el último registro guardado
    const usuario = usuarios[usuarios.length - 1];

    const nombre = document.createElement("p");
    nombre.textContent = "Nombre: " + usuario.nombre;

    const correo = document.createElement("p");
    correo.textContent = "Correo: " + usuario.correo;

    const telefono = document.createElement("p");
    telefono.textContent = "Teléfono: " + usuario.telefono;

    datosCuenta.append(nombre, correo, telefono);
});

