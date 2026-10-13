/* inicio.js - Muestra las noticias destacadas en el Home */
async function mostrarDestacadas() {
  const contenedor = document.getElementById("listaDestacadas");
  const noticias = await cargarNoticias();

  // Solo las que tienen destacada = true (máximo 3)
  const destacadas = noticias.filter(function (n) { return n.destacada; }).slice(0, 3);

  let html = "";
  destacadas.forEach(function (noticia) {
    html += crearTarjeta(noticia);
  });
  contenedor.innerHTML = html;
}

mostrarDestacadas();
