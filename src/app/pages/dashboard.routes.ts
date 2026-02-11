import { Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { MarketComponent } from './market/market.component';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', component: DashboardComponent },
  {path:'market',component:MarketComponent}

];
