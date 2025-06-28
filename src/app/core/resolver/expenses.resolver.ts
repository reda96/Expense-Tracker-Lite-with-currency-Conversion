// src/app/core/resolvers/expenses.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense';
import { ExpensesService } from '../services/expenses.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensesResolver implements Resolve<Expense[]> {
  constructor(private expenseService: ExpensesService,
           private authService:AuthService
  ) {}

  resolve(): Observable<Expense[]>  {
    let userId =this.authService.loggedInUser()?.id;
    
    
    return this.expenseService.getExpenses(userId || '','month',1); // This should return Observable<Expense[]>
 
  }
}
