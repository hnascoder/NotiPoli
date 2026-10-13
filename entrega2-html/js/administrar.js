/* administrar.js - Mini CRUD: crear y eliminar noticias */

// Pinta la tabla con todas las noticias
async function pintarTabla() {
  const noticias = await cargarNoticias();
  const cuerpo = document.getElementById("tablaNoticias");

  let html = "";
  noticias.forEach(function (n) {
    html += `
      <tr>
        <td>${n.id}</td>
        <td>${n.titulo}</td>
        <td><span class="badge etiqueta">${n.categoria}</span></td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-danger" onclick="eliminarNoticia(${n.id})">Eliminar</button>
        </td>
      </tr>`;
  });
  cuerpo.innerHTML = html;
  document.getElementById("totalNoticias").textContent = noticias.length;
}

// CREAR: toma los datos del formulario y guarda la noticia en localStorage
document.getElementById("formNoticia").addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const titulo = document.getElementById("nTitulo").value.trim();
  const categoria = document.getElementById("nCategoria").value;
  const resumen = document.getElementById("nResumen").value.trim();
  const contenido = document.getElementById("nContenido").value.trim();
  const sede = document.getElementById("nSede").value;
  const error = document.getElementById("errorNoticia");

  if (titulo === "" || categoria === "" || resumen === "" || contenido === "") {
    error.classList.remove("d-none");
    return;
  }
  error.classList.add("d-none");

  // Imagen por defecto según la categoría
  const imagenes = {
    "Institucional": "img/noticia2.jpg",
    "Académico": "img/noticia7.jpg",
    "Internacional": "img/noticia1.jpg",
    "Cultura": "img/noticia4.jpg",
    "Tecnología": "img/noticia3.jpg"
  };

  const nueva = {
    id: Date.now(), // número único
    titulo: titulo,
    categoria: categoria,
    fecha: new Date().toISOString().slice(0, 10),
    sede: sede,
    fuente: "",
    imagen: imagenes[categoria],
    resumen: resumen,
    contenido: contenido,
    destacada: false
  };

  const nuevas = leerLista(LLAVE_NUEVAS);
  nuevas.push(nueva);
  guardarLista(LLAVE_NUEVAS, nuevas);

  this.reset();
  pintarTabla();
});

// ELIMINAR: guarda el id en la lista de eliminadas
function eliminarNoticia(id) {
  if (!confirm("¿Seguro que deseas eliminar esta noticia?")) {
    return;
  }
  const eliminadas = leerLista(LLAVE_ELIMINADAS);
  eliminadas.push(id);
  guardarLista(LLAVE_ELIMINADAS, eliminadas);
  pintarTabla();
}

// Restaura las noticias originales (borra cambios del CRUD)
document.getElementById("btnRestaurar").addEventListener("click", function () {
  localStorage.removeItem(LLAVE_NUEVAS);
  localStorage.removeItem(LLAVE_ELIMINADAS);
  pintarTabla();
});

pintarTabla();
