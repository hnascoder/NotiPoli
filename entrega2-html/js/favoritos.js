/* favoritos.js - Lista personalizada del usuario (guardada en localStorage) */
async function mostrarFavoritos() {
  const contenedor = document.getElementById("listaFavoritos");
  const mensaje = document.getElementById("sinFavoritos");

  const noticias = await cargarNoticias();
  const idsFavoritos = obtenerFavoritos();
  const favoritas = noticias.filter(function (n) { return idsFavoritos.includes(n.id); });

  if (favoritas.length === 0) {
    contenedor.innerHTML = "";
    mensaje.classList.remove("d-none");
    return;
  }

  mensaje.classList.add("d-none");
  let html = "";
  favoritas.forEach(function (n) {
    html += `
      <div class="col-12 mb-3">
        <div class="card fila-favorito">
          <div class="row g-0 align-items-center">
            <div class="col-4 col-md-2">
              <img src="${n.imagen}" class="img-fluid rounded-start" alt="${n.titulo}">
            </div>
            <div class="col-8 col-md-10">
              <div class="card-body d-md-flex justify-content-between align-items-center">
                <div>
                  <span class="badge etiqueta">${n.categoria}</span>
                  <h6 class="mt-2 mb-1">${n.titulo}</h6>
                </div>
                <div class="mt-2 mt-md-0">
                  <a href="detalle.html?id=${n.id}" class="btn btn-sm btn-principal">Ver</a>
                  <button class="btn btn-sm btn-outline-danger" onclick="quitar(${n.id})">Quitar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  });
  contenedor.innerHTML = html;
}

// Quita una noticia de favoritos y vuelve a pintar la lista
function quitar(id) {
  cambiarFavorito(id);
  mostrarFavoritos();
}

mostrarFavoritos();
