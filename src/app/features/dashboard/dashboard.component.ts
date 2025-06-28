import { Component, computed, effect, HostListener, inject, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Expense } from '../../core/models/expense';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ProfileSectionComponent } from '../../shared/profile-section/profile-section.component';
import { MatIconModule } from '@angular/material/icon';
import { ListItemComponent } from '../../shared/list-item/list-item.component';
import { ExpensesService } from '../../core/services/expenses.service';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, CommonModule,ProfileSectionComponent, MatIconModule, ListItemComponent,MatProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy {
   
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private expensesService = inject(ExpensesService);
  filterType='month';
  currentPage =1;
  isLoading = signal<boolean>(false);
  expenses = signal<Expense[]>([]);
  loggedInUser = this.authService.loggedInUser;
  totalItems = this.expensesService.items;
  expenseSub!:Subscription;
  totalBalance = computed(()=> {
   let totExpenses = this.loggedInUser()?.expenses ||0;
   let income = this.loggedInUser()?.income ||0;
    if(this.loggedInUser() )
    return income -totExpenses;
    return 0;
  })
 
   constructor() {
    effect(() => {
      const data = this.route.snapshot.data['expenses'];
      if (data) {
        this.expenses.set(data);
      }
    });
  }
  filterExpenses=(filterType:string,page:number)=>{
    this.filterType = filterType;
    this.currentPage = page;
    this.isLoading.set(true);
    this.expenseSub= this.expensesService.getExpenses(this.loggedInUser()?.id||'',filterType,page)
    .subscribe(res=>{
      this.isLoading.set(false);
      if(page>1) 
      this.expenses.set([...this.expenses(),...res])
      else this.expenses.set(res)})
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event:any){
      //console.log(event);
        const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;

  if (scrollTop + windowHeight >= docHeight - 100) {
      if(this.totalItems()/10 > this.currentPage)
      this.filterExpenses(this.filterType, this.currentPage +1)
      else this.isLoading.set(false)
  }
   
  }
  ngOnDestroy(): void {
    this.expenseSub?.unsubscribe();
  }
}
