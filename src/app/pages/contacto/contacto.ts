import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.html'
})
export class Contacto {
  // Campos del formulario (two-way binding con [(ngModel)])
  nombre = signal('');
  correo = signal('');
  asunto = signal('');
  mensaje = signal('');

  // Se vuelve true cuando el usuario intenta enviar: ahí mostramos los errores
  intentoEnviar = signal(false);
  confirmacion = signal('');

  asuntos = ['Sugerencia', 'Enviar una noticia de mi sede', 'Reportar un error', 'Otro'];

  // Expresión regular sencilla para validar el correo
  private patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validaciones de cada campo
  nombreValido(): boolean { return this.nombre().trim().length >= 3; }
  correoValido(): boolean { return this.patronCorreo.test(this.correo().trim()); }
  asuntoValido(): boolean { return this.asunto() !== ''; }
  mensajeValido(): boolean { return this.mensaje().trim().length >= 10; }

  // (ngSubmit) llama a este método cuando se envía el formulario
  enviar(): void {
    this.intentoEnviar.set(true);

    if (this.nombreValido() && this.correoValido() && this.asuntoValido() && this.mensajeValido()) {
      this.confirmacion.set('¡Gracias, ' + this.nombre().trim() + '! Tu mensaje fue enviado. Te responderemos pronto a ' + this.correo().trim() + '.');
      // Limpiamos el formulario
      this.nombre.set('');
      this.correo.set('');
      this.asunto.set('');
      this.mensaje.set('');
      this.intentoEnviar.set(false);
    } else {
      this.confirmacion.set('');
    }
  }
}
