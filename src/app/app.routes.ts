import { Routes } from '@angular/router';
import { AddExpenseComponent } from './features/add-expense/add-expense.component';
import { AuthComponent } from './features/auth/auth.component';

export const routes: Routes = [
  { path: 'add-expense', component: AddExpenseComponent },
//   { path: 'dashboard', component: EditUserComponent },
  { path: '', component: AuthComponent }
];
