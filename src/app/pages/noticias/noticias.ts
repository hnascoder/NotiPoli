import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaCard } from '../../components/noticia-card/noticia-card';
import { CATEGORIAS, Noticia } from '../../models/noticia';

@Component({
  selector: 'app-noticias',
  imports: [FormsModule, NoticiaCard],
  templateUrl: './noticias.html'
})
export class Noticias implements OnInit {
  private servicio = inject(NoticiasService);
  private ruta = inject(ActivatedRoute);

  categorias = CATEGORIAS;
  todas = signal<Noticia[]>([]);

  // Two-way binding con [(ngModel)]: lo que el usuario escribe queda en estos signals
  texto = signal('');
  categoria = signal('Todas');

  // computed: se vuelve a calcular solo cuando cambia texto, categoria o todas
  filtradas = computed(() =>
    this.todas().filter(n =>
      n.titulo.toLowerCase().includes(this.texto().toLowerCase()) &&
      (this.categoria() === 'Todas' || n.categoria === this.categoria())
    )
  );

  ngOnInit(): void {
    // Si viene ?categoria=Cultura en la URL se selecciona ese filtro
    const categoriaUrl = this.ruta.snapshot.queryParamMap.get('categoria');
    if (categoriaUrl) {
      this.categoria.set(categoriaUrl);
    }
    this.servicio.obtenerNoticias().subscribe(noticias => this.todas.set(noticias));
  }
}
