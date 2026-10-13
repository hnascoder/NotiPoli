// Estructura de una noticia (igual a los objetos de data/noticias.json)
export interface Noticia {
  id: number;
  titulo: string;
  categoria: string;
  fecha: string;
  sede: string;
  imagen: string;
  resumen: string;
  contenido: string;
  fuente: string;      // enlace a la noticia original en poli.edu.co
  destacada: boolean;
}

// Categorías que usamos en los filtros y formularios
export const CATEGORIAS = ['Institucional', 'Académico', 'Internacional', 'Cultura', 'Tecnología'];
