# NotiPoli – Plataforma Web de Noticias (Angular)

Proyecto académico del módulo **Desarrollo Front-end** – Entrega 3 (versión final).
NotiPoli reúne las noticias de la comunidad del Politécnico Grancolombiano. Los textos son resúmenes propios de la sección [Actualidad Poli](https://www.poli.edu.co/noticias) y cada noticia enlaza a su fuente original.

> Este sitio es un proyecto de clase y no es un canal oficial del Poli.

- **Aplicación desplegada:** https://hnascoder.github.io/NotiPoli/
- **Repositorio:** https://github.com/hnascoder/NotiPoli

## Tecnologías
Angular 21 (componentes standalone, rutas, servicios, signals y data binding), TypeScript, HTML, CSS, Bootstrap 5.3 (CDN), JSON local y localStorage. Despliegue en GitHub Pages.

## Páginas (rutas)
| Ruta | Componente | Qué hace |
|---|---|---|
| `#/` | `Inicio` | Bienvenida, noticias destacadas, categorías, datos del Poli y llamado a la acción |
| `#/noticias` | `Noticias` | Listado en cards con búsqueda y filtro por categoría |
| `#/noticia/:id` | `Detalle` | Información completa, favoritos y enlace a poli.edu.co |
| `#/favoritos` | `Favoritos` | Lista personalizada guardada en `localStorage` |
| `#/contacto` | `Contacto` | Formulario con validaciones y mensaje de confirmación |
| `#/administrar` | `Administrar` | Mini CRUD: crear y eliminar noticias |

## Estructura
```
NotiPoli/
├── src/
│   ├── index.html, main.ts, styles.css
│   └── app/
│       ├── app.ts, app.html, app.config.ts, app.routes.ts
│       ├── models/noticia.ts
│       ├── services/noticias.service.ts
│       ├── components/ (header, footer, noticia-card)
│       └── pages/ (inicio, noticias, detalle, favoritos, contacto, administrar)
├── public/ (data/noticias.json e img/)
├── docs/          -> versión compilada que publica GitHub Pages
├── mockups/       -> wireframes de la Entrega 1
└── entrega2-html/ -> versión HTML/CSS/JS de la Entrega 2
```

## Cómo ejecutarlo en el computador
Se necesita [Node.js](https://nodejs.org/) (versión 20.19 o superior).

```bash
npm install
npm start          # abre en http://localhost:4200
```

## Cómo publicarlo en GitHub Pages
```bash
npm run build:github   # compila en la carpeta docs/ con la ruta /NotiPoli/
```
Luego se suben los cambios y en **Settings → Pages** se elige la rama `main` y la carpeta `/docs`.

## Autor
Juan Sebastián Hernández – Politécnico Grancolombiano, 2026.
