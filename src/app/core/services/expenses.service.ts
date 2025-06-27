import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, tap } from 'rxjs';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private apiUrl = environment.url; // JSON Server UR
  private exchangeRateSub = new BehaviorSubject<number>(0);
  public get exchangeRate$() {
    return this.exchangeRateSub.asObservable();
  }
  constructor(private http: HttpClient,
    private toast: ToastService,
    private router:Router
  ) { }

   getExchangeRateWithToUSD(currencyCode:string) {
           this.http.get<any>(`${this.apiUrl}/exchangeRates?from=${currencyCode}&to=usd`)
           .pipe(tap((res:{rate:number;from:string;to:string}[])=> this.exchangeRateSub.next(res[0].rate))).subscribe( );
    }

    addExpense(expense:Expense) {
       this.http.post<any>(`${this.apiUrl}/expenses`,expense)
           .pipe(tap(res=> this.router.navigate(['dashboard']))).subscribe( );
    }
  
}
