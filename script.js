const opcionesFetch = { 
    method: "GET", 
    headers: { "Content-Type": "application/json" } 
};

// Elementos del DOM
const formulario = document.getElementById("formulario-busqueda");
const inputBusqueda = document.getElementById("input-busqueda");
const contenedorUsuarios = document.getElementById("resultado-api-1");
const contenedorPokemon = document.getElementById("resultado-api-2");

let listaUsuariosGlobal = []; // Guardaremos los usuarios aquí para filtrarlos sin recargar

/**
 * Función dinámica para generar tablas. 
 * Detecta si recibe un arreglo (múltiples resultados) o un objeto (un resultado).
 */
function generarTablaHTML(datos, contenedor) {
    if (!datos || (Array.isArray(datos) && datos.length === 0)) {
        contenedor.innerHTML = "<p class=\"error-msg\">No se encontraron resultados.</p>";
        return;
    }

    // Convertimos un único objeto en un arreglo de un elemento para procesarlo igual
    const datosArray = Array.isArray(datos) ? datos : [datos];
    
    // Extraemos las llaves del primer elemento para usarlas como encabezados
    const encabezados = Object.keys(datosArray[0]);

    let tablaHTML = "<table><thead><tr>";
    encabezados.forEach(encabezado => {
        tablaHTML += `<th>${encabezado}</th>`;
    });
    tablaHTML += "</tr></thead><tbody>";

    // Llenado dinámico: iteramos cada objeto y extraemos sus valores textuales
    datosArray.forEach(item => {
        tablaHTML += "<tr>";
        encabezados.forEach(encabezado => {
            tablaHTML += `<td>${item[encabezado]}</td>`;
        });
        tablaHTML += "</tr>";
    });

    tablaHTML += "</tbody></table>";
    contenedor.innerHTML = tablaHTML;
}

// --- Fetch Inicial: Obtenemos todos los usuarios una sola vez ---
fetch("https://jsonplaceholder.typicode.com/users", opcionesFetch)
    .then(res => res.json())
    .then(data => {
        // Mapeamos los datos para aplanar el JSON y evitar objetos anidados
        listaUsuariosGlobal = data.map(user => ({
            "Nombre Completo": user.name,
            "Usuario": user.username,
            "Correo Electrónico": user.email,
            "Ciudad": user.address.city
        }));
        // Mostramos todos los usuarios inicialmente
        generarTablaHTML(listaUsuariosGlobal, contenedorUsuarios);
    })
    .catch(error => console.error("Error cargando usuarios:", error));

// --- Evento del Formulario ---
formulario.addEventListener("submit", (evento) => {
    // 1. Evitamos el comportamiento por defecto (refrescar la página)
    evento.preventDefault(); 
    
    // Obtenemos el término escrito y lo convertimos a minúsculas
    const terminoBuscado = inputBusqueda.value.trim().toLowerCase();

    // === ACCIÓN A: Filtrado usando JavaScript (Usuarios) ===
    // Usamos el método .filter() de los arreglos
    const usuariosFiltrados = listaUsuariosGlobal.filter(user => 
        user["Nombre Completo"].toLowerCase().includes(terminoBuscado) || 
        user["Usuario"].toLowerCase().includes(terminoBuscado)
    );
    generarTablaHTML(usuariosFiltrados, contenedorUsuarios);

    // === ACCIÓN B: Filtrado usando los parámetros de la API (PokeAPI) ===
    contenedorPokemon.innerHTML = "<p>Buscando Pokémon...</p>";
    // PokeAPI permite buscar agregando el nombre al final de la URL
    fetch(`https://pokeapi.co/api/v2/pokemon/${terminoBuscado}`, opcionesFetch)
        .then(res => {
            if (!res.ok) throw new Error("Pokémon no encontrado");
            return res.json();
        })
        .then(data => {
            // Aplanamos el JSON obtenido
            const datosPokemon = { 
                "Nombre": data.name.toUpperCase(), 
                "Tipo Principal": data.types[0].type.name,
                "Peso": `${data.weight} hg`, 
                "Experiencia Base": data.base_experience
            };
            generarTablaHTML(datosPokemon, contenedorPokemon);
        })
        .catch(error => {
            contenedorPokemon.innerHTML = `<p class="error-msg">${error.message}. Intenta con nombres como "pikachu" o "snorlax".</p>`;
        });
});