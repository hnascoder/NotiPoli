import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Noticias } from './pages/noticias/noticias';
import { Detalle } from './pages/detalle/detalle';
import { Favoritos } from './pages/favoritos/favoritos';
import { Contacto } from './pages/contacto/contacto';
import { Administrar } from './pages/administrar/administrar';

// Cada ruta muestra un componente (una "página") dentro del <router-outlet>
export const routes: Routes = [
  { path: '', component: Inicio, title: 'NotiPoli | Inicio' },
  { path: 'noticias', component: Noticias, title: 'NotiPoli | Noticias' },
  { path: 'noticia/:id', component: Detalle, title: 'NotiPoli | Detalle' },
  { path: 'favoritos', component: Favoritos, title: 'NotiPoli | Mis favoritos' },
  { path: 'contacto', component: Contacto, title: 'NotiPoli | Contacto' },
  { path: 'administrar', component: Administrar, title: 'NotiPoli | Administrar' },
  // Si la ruta no existe, vuelve al inicio
  { path: '**', redirectTo: '' }
];
