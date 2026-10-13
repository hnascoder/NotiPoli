import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoticiasService } from '../../services/noticias.service';
import { CATEGORIAS, Noticia } from '../../models/noticia';

@Component({
  selector: 'app-administrar',
  imports: [FormsModule],
  templateUrl: './administrar.html'
})
export class Administrar implements OnInit {
  private servicio = inject(NoticiasService);

  categorias = CATEGORIAS;
  sedes = ['Bogotá', 'Medellín', 'Virtual'];
  noticias = signal<Noticia[]>([]);
  error = signal(false);

  // Campos del formulario de nueva noticia
  titulo = signal('');
  categoria = signal('');
  sede = signal('Bogotá');
  resumen = signal('');
  contenido = signal('');

  // Imagen por defecto según la categoría
  private imagenes: Record<string, string> = {
    'Institucional': 'img/noticia2.jpg',
    'Académico': 'img/noticia7.jpg',
    'Internacional': 'img/noticia1.jpg',
    'Cultura': 'img/noticia4.jpg',
    'Tecnología': 'img/noticia3.jpg'
  };

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.servicio.obtenerNoticias().subscribe(lista => this.noticias.set(lista));
  }

  // CREAR
  guardar(): void {
    if (!this.titulo().trim() || !this.categoria() || !this.resumen().trim() || !this.contenido().trim()) {
      this.error.set(true);
      return;
    }
    this.error.set(false);

    const nueva: Noticia = {
      id: Date.now(), // número único
      titulo: this.titulo().trim(),
      categoria: this.categoria(),
      fecha: new Date().toISOString().slice(0, 10),
      sede: this.sede(),
      imagen: this.imagenes[this.categoria()],
      resumen: this.resumen().trim(),
      contenido: this.contenido().trim(),
      fuente: '',
      destacada: false
    };
    this.servicio.crearNoticia(nueva);

    // Limpiamos el formulario y recargamos la tabla
    this.titulo.set('');
    this.categoria.set('');
    this.resumen.set('');
    this.contenido.set('');
    this.cargar();
  }

  // ELIMINAR
  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta noticia?')) {
      this.servicio.eliminarNoticia(id);
      this.cargar();
    }
  }

  restaurar(): void {
    this.servicio.restaurar();
    this.cargar();
  }
}
