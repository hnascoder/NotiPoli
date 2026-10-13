/* noticias.js - Listado de noticias con búsqueda y filtro por categoría */
let todasLasNoticias = [];

// Pinta en pantalla la lista que recibe
function pintarNoticias(lista) {
  const contenedor = document.getElementById("listaNoticias");
  const mensaje = document.getElementById("sinResultados");

  if (lista.length === 0) {
    contenedor.innerHTML = "";
    mensaje.classList.remove("d-none");
    return;
  }

  mensaje.classList.add("d-none");
  let html = "";
  lista.forEach(function (noticia) {
    html += crearTarjeta(noticia);
  });
  contenedor.innerHTML = html;
}

// Aplica el texto de búsqueda y la categoría seleccionada
function filtrar() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  const categoria = document.getElementById("filtroCategoria").value;

  const resultado = todasLasNoticias.filter(function (n) {
    const coincideTexto = n.titulo.toLowerCase().includes(texto);
    const coincideCategoria = categoria === "Todas" || n.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });

  pintarNoticias(resultado);
}

async function iniciar() {
  todasLasNoticias = await cargarNoticias();

  // Si viene ?categoria=Cultura en la URL, se selecciona ese filtro
  const parametros = new URLSearchParams(window.location.search);
  const categoriaUrl = parametros.get("categoria");
  if (categoriaUrl) {
    document.getElementById("filtroCategoria").value = categoriaUrl;
  }

  filtrar();

  // Eventos: cada vez que el usuario escribe o cambia el filtro
  document.getElementById("buscador").addEventListener("input", filtrar);
  document.getElementById("filtroCategoria").addEventListener("change", filtrar);
}

iniciar();
