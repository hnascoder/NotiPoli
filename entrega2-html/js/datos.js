/* =========================================================
   datos.js
   Funciones compartidas por todas las páginas:
   - Cargar las noticias desde el archivo JSON
   - Guardar y leer favoritos en localStorage
   - Crear la tarjeta (card) HTML de una noticia
   ========================================================= */

// Nombres de las "llaves" que usamos en localStorage
const LLAVE_FAVORITOS = "favoritos";
const LLAVE_NUEVAS = "noticiasNuevas";
const LLAVE_ELIMINADAS = "noticiasEliminadas";

// Lee un arreglo guardado en localStorage (si no existe devuelve [])
function leerLista(llave) {
  const texto = localStorage.getItem(llave);
  if (texto === null) {
    return [];
  }
  return JSON.parse(texto);
}

// Guarda un arreglo en localStorage convirtiéndolo a texto
function guardarLista(llave, lista) {
  localStorage.setItem(llave, JSON.stringify(lista));
}

// Carga las noticias del JSON y las junta con las que el usuario
// creó en la página Administrar. También quita las eliminadas.
async function cargarNoticias() {
  const respuesta = await fetch("data/noticias.json");
  const noticiasJson = await respuesta.json();

  const nuevas = leerLista(LLAVE_NUEVAS);
  const eliminadas = leerLista(LLAVE_ELIMINADAS);

  const todas = noticiasJson.concat(nuevas);

  // filter deja solo las noticias cuyo id NO está en eliminadas
  return todas.filter(function (noticia) {
    return !eliminadas.includes(noticia.id);
  });
}

// ---------- Favoritos ----------
function obtenerFavoritos() {
  return leerLista(LLAVE_FAVORITOS);
}

function esFavorito(id) {
  return obtenerFavoritos().includes(id);
}

// Si la noticia ya es favorita la quita, si no la agrega
function cambiarFavorito(id) {
  let favoritos = obtenerFavoritos();
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(function (f) { return f !== id; });
  } else {
    favoritos.push(id);
  }
  guardarLista(LLAVE_FAVORITOS, favoritos);
  actualizarContadorFavoritos();
}

// Muestra el número de favoritos en el menú (badge)
function actualizarContadorFavoritos() {
  const contador = document.getElementById("contadorFavoritos");
  if (contador) {
    contador.textContent = obtenerFavoritos().length;
  }
}

// Convierte "2026-09-20" en "20 de septiembre de 2026"
function formatearFecha(fechaTexto) {
  const fecha = new Date(fechaTexto + "T00:00:00");
  return fecha.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
}

// Devuelve el HTML de una tarjeta de noticia
function crearTarjeta(noticia) {
  return `
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="card tarjeta-noticia h-100">
        <img src="${noticia.imagen}" class="card-img-top" alt="${noticia.titulo}">
        <div class="card-body d-flex flex-column">
          <span class="badge etiqueta mb-2">${noticia.categoria}</span>
          <h5 class="card-title">${noticia.titulo}</h5>
          <p class="card-text text-muted">${noticia.resumen}</p>
          <a href="detalle.html?id=${noticia.id}" class="btn btn-principal mt-auto">Ver más</a>
        </div>
      </div>
    </div>`;
}

// Al cargar cualquier página se actualiza el contador del menú
document.addEventListener("DOMContentLoaded", actualizarContadorFavoritos);
