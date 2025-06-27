import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'add-expense', canActivate: [authGuard], loadComponent: () => import('./features/add-expense/add-expense.component').then(m => m.AddExpenseComponent) },
  { path: 'dashboard', canActivate: [authGuard],loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'login', loadComponent: () => import('./features/auth/auth.component').then(m=>m.AuthComponent) },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
