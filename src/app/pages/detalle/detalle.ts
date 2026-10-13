import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models/noticia';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink, DatePipe],
  templateUrl: './detalle.html'
})
export class Detalle implements OnInit {
  private servicio = inject(NoticiasService);
  private ruta = inject(ActivatedRoute);

  noticia = signal<Noticia | undefined>(undefined);
  relacionadas = signal<Noticia[]>([]);
  favorito = signal(false);
  noExiste = signal(false);

  ngOnInit(): void {
    // Escuchamos el id de la URL (/noticia/3). Si cambia, se vuelve a cargar.
    this.ruta.paramMap.subscribe(parametros => {
      const id = Number(parametros.get('id'));

      this.servicio.obtenerNoticias().subscribe(noticias => {
        const encontrada = noticias.find(n => n.id === id);
        this.noticia.set(encontrada);
        this.noExiste.set(!encontrada);

        if (encontrada) {
          this.favorito.set(this.servicio.esFavorito(id));
          // Noticias de la misma categoría (máximo 2)
          this.relacionadas.set(
            noticias.filter(n => n.categoria === encontrada.categoria && n.id !== id).slice(0, 2)
          );
        }
      });
    });
  }

  // Event binding: se ejecuta con (click) en el botón de favoritos
  cambiarFavorito(id: number): void {
    this.servicio.cambiarFavorito(id);
    this.favorito.set(this.servicio.esFavorito(id));
  }
}
