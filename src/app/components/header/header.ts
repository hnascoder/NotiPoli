import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html'
})
export class Header {
  // Usamos el servicio para mostrar el número de favoritos
  servicio = inject(NoticiasService);

  // Lista del menú: se recorre con @for en el HTML
  menu = [
    { ruta: '/', texto: 'Inicio' },
    { ruta: '/noticias', texto: 'Noticias' },
    { ruta: '/favoritos', texto: 'Favoritos' },
    { ruta: '/contacto', texto: 'Contacto' },
    { ruta: '/administrar', texto: 'Administrar' }
  ];
}
