import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private apiUrl = environment.url; // JSON Server UR
   private totalItems = signal<number>(0);
  items = this.totalItems.asReadonly();
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
       this.http.post<any>(`${this.apiUrl}/expenses`,{...expense,dateInt: this.formatDateForJsonServer(new Date(expense.date)) })
           .pipe(tap(res=> this.router.navigate(['dashboard']))).subscribe( );
    }
       getExpenses(userId:string, filterType:string,page:number) {
        let today:any = new Date();
      
        let date:any = new Date();
        if(filterType == "week")         
         date.setDate(today.getDate() - 7);
        else  if(filterType == "month") date =new Date(today.getFullYear(), today.getMonth(), 1)
         
          today = (this.formatDateForJsonServer(today));
        date = (this.formatDateForJsonServer(date));
        if(!filterType) {
           date = 0;
        }
     // return this.http.get<any>(`${this.apiUrl}/expenses?dateInt_gt=${date}`);
      
      return this.http.get<any>(`${this.apiUrl}/expenses?userId=${userId}&dateInt_gte=${date}&_page=${page}&_per_page=10&_sort=-dateInt&_order=desc`)
      .pipe(map(res=>{
        this.totalItems.set(res.items)
        return res.data}));
    }
   formatDateForJsonServer(date: Date): number {
  return parseInt(date.toISOString().split('T')[0].replaceAll('-','')) ; // removes milliseconds
}
}
