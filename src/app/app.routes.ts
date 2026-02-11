import { Routes } from '@angular/router';
import { Login } from './pages/content-page/login/login';
import { Layout } from './layout/layout';
import { authGuard } from './guards/auth.guard';
import { MarketComponent } from './pages/market/market.component';


export const routes: Routes = [
  // Login route (no layout)
  { path: '', component: Login },

  // Routes inside Layout (header/sidebar)
  {
    path: '',
    component: Layout,
    // canActivate: [authGuard], // uncomment if needed
    children: [
      // Dashboard (lazy-loaded)
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },

      // Market (direct component, same layout)
      { path: 'market', component: MarketComponent }
    ]
  },

  // Fallback route
  { path: '**', redirectTo: '' }
];
