import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'board',
    loadChildren: () => import("./core/features/kanban/kanban.routes").then((m) => m.KANBAN_ROUTES),
  },
];
