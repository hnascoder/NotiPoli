import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaCard } from '../../components/noticia-card/noticia-card';
import { Noticia } from '../../models/noticia';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, NoticiaCard],
  templateUrl: './inicio.html'
})
export class Inicio implements OnInit {
  private servicio = inject(NoticiasService);

  // signal: cuando cambia su valor, Angular actualiza la vista
  destacadas = signal<Noticia[]>([]);

  categorias = [
    { nombre: 'Institucional', icono: '🏛️' },
    { nombre: 'Académico', icono: '🎓' },
    { nombre: 'Internacional', icono: '🌎' },
    { nombre: 'Cultura', icono: '📚' },
    { nombre: 'Tecnología', icono: '💻' }
  ];

  // Datos para la sección "¿Sabías que...?"
  datos = [
    { numero: '+61.500', texto: 'estudiantes hacen parte del Poli en Colombia.' },
    { numero: '≈ 980', texto: 'municipios del país tienen estudiantes del Poli gracias a la educación virtual.' },
    { numero: '65 %', texto: 'de los estudiantes trabaja mientras estudia.' }
  ];

  ngOnInit(): void {
    // Al iniciar el componente pedimos las noticias y dejamos solo 3 destacadas
    this.servicio.obtenerNoticias().subscribe(noticias => {
      this.destacadas.set(noticias.filter(n => n.destacada).slice(0, 3));
    });
  }
}
