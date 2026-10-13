import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models/noticia';

@Component({
  selector: 'app-favoritos',
  imports: [RouterLink],
  templateUrl: './favoritos.html'
})
export class Favoritos implements OnInit {
  private servicio = inject(NoticiasService);

  favoritas = signal<Noticia[]>([]);
  cargado = signal(false);

  ngOnInit(): void {
    this.cargar();
  }

  // Trae las noticias y deja solo las que están en favoritos
  cargar(): void {
    this.servicio.obtenerNoticias().subscribe(noticias => {
      const ids = this.servicio.obtenerFavoritos();
      this.favoritas.set(noticias.filter(n => ids.includes(n.id)));
      this.cargado.set(true);
    });
  }

  quitar(id: number): void {
    this.servicio.cambiarFavorito(id);
    this.cargar();
  }
}
