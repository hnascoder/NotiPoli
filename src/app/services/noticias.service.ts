import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Noticia } from '../models/noticia';

/* =========================================================
   NoticiasService
   Servicio compartido por todos los componentes:
   - Carga las noticias desde data/noticias.json
   - Guarda y lee favoritos en localStorage
   - Crea y elimina noticias (mini CRUD)
   ========================================================= */

// Nombres de las "llaves" que usamos en localStorage
const LLAVE_FAVORITOS = 'favoritos';
const LLAVE_NUEVAS = 'noticiasNuevas';
const LLAVE_ELIMINADAS = 'noticiasEliminadas';

@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private http = inject(HttpClient);

  // Signal con la cantidad de favoritos (el header la muestra en el menú)
  totalFavoritos = signal(this.leerLista<number>(LLAVE_FAVORITOS).length);

  // ---------- localStorage ----------
  private leerLista<T>(llave: string): T[] {
    const texto = localStorage.getItem(llave);
    return texto ? JSON.parse(texto) : [];
  }

  private guardarLista(llave: string, lista: unknown[]): void {
    localStorage.setItem(llave, JSON.stringify(lista));
  }

  // ---------- Noticias ----------
  // Lee el JSON, le suma las noticias creadas y quita las eliminadas
  obtenerNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>('data/noticias.json').pipe(
      map(noticiasJson => {
        const nuevas = this.leerLista<Noticia>(LLAVE_NUEVAS);
        const eliminadas = this.leerLista<number>(LLAVE_ELIMINADAS);
        return noticiasJson.concat(nuevas).filter(n => !eliminadas.includes(n.id));
      })
    );
  }

  // CREAR: guarda la noticia nueva en localStorage
  crearNoticia(noticia: Noticia): void {
    const nuevas = this.leerLista<Noticia>(LLAVE_NUEVAS);
    nuevas.push(noticia);
    this.guardarLista(LLAVE_NUEVAS, nuevas);
  }

  // ELIMINAR: guarda el id en la lista de eliminadas
  eliminarNoticia(id: number): void {
    const eliminadas = this.leerLista<number>(LLAVE_ELIMINADAS);
    eliminadas.push(id);
    this.guardarLista(LLAVE_ELIMINADAS, eliminadas);
  }

  // Borra los cambios del CRUD y deja solo las noticias del JSON
  restaurar(): void {
    localStorage.removeItem(LLAVE_NUEVAS);
    localStorage.removeItem(LLAVE_ELIMINADAS);
  }

  // ---------- Favoritos ----------
  obtenerFavoritos(): number[] {
    return this.leerLista<number>(LLAVE_FAVORITOS);
  }

  esFavorito(id: number): boolean {
    return this.obtenerFavoritos().includes(id);
  }

  // Si ya es favorita la quita, si no la agrega
  cambiarFavorito(id: number): void {
    let favoritos = this.obtenerFavoritos();
    if (favoritos.includes(id)) {
      favoritos = favoritos.filter(f => f !== id);
    } else {
      favoritos.push(id);
    }
    this.guardarLista(LLAVE_FAVORITOS, favoritos);
    this.totalFavoritos.set(favoritos.length);
  }
}
