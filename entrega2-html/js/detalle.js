/* detalle.js - Muestra la información completa de una noticia */

// Cambia el texto y color del botón según si es favorito o no
function actualizarBoton(id) {
  const boton = document.getElementById("btnFavorito");
  if (esFavorito(id)) {
    boton.textContent = "★ Quitar de favoritos";
    boton.classList.remove("btn-outline-warning");
    boton.classList.add("btn-warning");
  } else {
    boton.textContent = "☆ Agregar a favoritos";
    boton.classList.remove("btn-warning");
    boton.classList.add("btn-outline-warning");
  }
}

async function mostrarDetalle() {
  // Leemos el id que viene en la URL: detalle.html?id=3
  const parametros = new URLSearchParams(window.location.search);
  const id = Number(parametros.get("id"));

  const noticias = await cargarNoticias();
  const noticia = noticias.find(function (n) { return n.id === id; });

  // Si no existe mostramos un aviso
  if (!noticia) {
    document.getElementById("detalle").innerHTML =
      '<div class="alert alert-danger">La noticia no existe. <a href="noticias.html">Volver al listado</a></div>';
    return;
  }

  document.title = noticia.titulo + " | NotiPoli";
  document.getElementById("detalleCategoria").textContent = noticia.categoria;
  document.getElementById("detalleTitulo").textContent = noticia.titulo;
  document.getElementById("detalleDatos").textContent =
    "Sede " + noticia.sede + " · " + formatearFecha(noticia.fecha);
  document.getElementById("detalleImagen").src = noticia.imagen;
  document.getElementById("detalleImagen").alt = noticia.titulo;
  document.getElementById("detalleContenido").textContent = noticia.contenido;

  // Enlace a la noticia original en poli.edu.co (las creadas por el usuario no tienen)
  const btnFuente = document.getElementById("btnFuente");
  if (noticia.fuente) {
    btnFuente.href = noticia.fuente;
  } else {
    btnFuente.classList.add("d-none");
  }

  actualizarBoton(id);
  document.getElementById("btnFavorito").addEventListener("click", function () {
    cambiarFavorito(id);
    actualizarBoton(id);
  });

  // Noticias relacionadas: misma categoría, distinta noticia
  const relacionadas = noticias
    .filter(function (n) { return n.categoria === noticia.categoria && n.id !== id; })
    .slice(0, 2);

  let html = "";
  relacionadas.forEach(function (n) {
    html += `<li class="mb-2"><a href="detalle.html?id=${n.id}">${n.titulo}</a></li>`;
  });
  document.getElementById("relacionadas").innerHTML = html || "<li>No hay más noticias de esta categoría.</li>";
}

mostrarDetalle();
