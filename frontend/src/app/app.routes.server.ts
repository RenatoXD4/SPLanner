import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/:id',
    // Le dices a Angular que NO pre-renderice esta ruta
    renderMode: RenderMode.Client 
  }
];
