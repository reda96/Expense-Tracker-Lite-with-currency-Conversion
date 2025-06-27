import { Routes } from '@angular/router';
import { AddExpenseComponent } from './features/add-expense/add-expense.component';
import { AuthComponent } from './features/auth/auth.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'add-expense', component: AddExpenseComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: AuthComponent }
];
