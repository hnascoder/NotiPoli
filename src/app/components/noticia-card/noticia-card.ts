import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia';

// Tarjeta (card) de una noticia. Se reutiliza en Inicio y en Noticias.
@Component({
  selector: 'app-noticia-card',
  imports: [RouterLink],
  templateUrl: './noticia-card.html'
})
export class NoticiaCard {
  // @Input: el componente padre le pasa la noticia → <app-noticia-card [noticia]="n" />
  @Input() noticia!: Noticia;
}
