/* contacto.js - Validación del formulario de contacto */
const formulario = document.getElementById("formContacto");

// Expresión regular sencilla para validar un correo
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Marca un campo como válido o inválido (clases de Bootstrap)
function marcar(campo, esValido) {
  if (esValido) {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
  } else {
    campo.classList.remove("is-valid");
    campo.classList.add("is-invalid");
  }
  return esValido;
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita que la página se recargue

  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const asunto = document.getElementById("asunto");
  const mensaje = document.getElementById("mensaje");

  // Se valida cada campo
  const okNombre = marcar(nombre, nombre.value.trim().length >= 3);
  const okCorreo = marcar(correo, patronCorreo.test(correo.value.trim()));
  const okAsunto = marcar(asunto, asunto.value !== "");
  const okMensaje = marcar(mensaje, mensaje.value.trim().length >= 10);

  if (okNombre && okCorreo && okAsunto && okMensaje) {
    // Mensaje de confirmación
    const alerta = document.getElementById("confirmacion");
    alerta.textContent = "¡Gracias, " + nombre.value.trim() + "! Tu mensaje fue enviado. Te responderemos pronto a " + correo.value.trim() + ".";
    alerta.classList.remove("d-none");

    formulario.reset();
    [nombre, correo, asunto, mensaje].forEach(function (c) { c.classList.remove("is-valid"); });
  }
});
