import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FormComponent } from '../../shared/form/form.component';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { FormBuilder, Validators } from '@angular/forms';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { DateInputComponent } from '../../shared/date-input/date-input.component';
import { ImageInputComponent } from '../../shared/image-input/image-input.component';
import { IconSelectionComponent } from '../../shared/icon-selection/icon-selection.component';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { LoadingDisabledInputComponent } from '../../shared/loading-disabled-input/loading-disabled-input.component';
import { ExpensesService } from '../../core/services/expenses.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-expense',
  imports: [FormComponent, TextInputComponent, DropdownComponent,  ButtonComponent, DateInputComponent, ImageInputComponent
    , IconSelectionComponent, MatIconModule, LoadingDisabledInputComponent],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss'
})
export class AddExpenseComponent implements OnInit {
  form:any;
  private fb = inject(FormBuilder);
  private location = inject(Location);
  private expensesService = inject(ExpensesService);
  originalAmount = signal(0);
  isLoadingExchangeRate = signal(false);
  currency = signal('');
  imageObject = signal(null);
  exchangeRate = toSignal(this.expensesService.exchangeRate$,{initialValue:0});
  convertedAmount = computed(() => this.originalAmount() * this.exchangeRate());
   categories = [
  { label: 'Food',       value: 'food',        icon: 'restaurant' },
  { label: 'Groceries',           value: 'groceries',   icon: 'local_grocery_store' },
  { label: 'Travel',              value: 'travel',      icon: 'flight' },
  { label: 'Shopping',            value: 'shopping',    icon: 'shopping_cart' },
  { label: 'Utilities',           value: 'utilities',   icon: 'electrical_services' },
  { label: 'Health',              value: 'health',      icon: 'medical_services' },
  { label: 'Entertainment',       value: 'entertainment', icon: 'movie' },
  { label: 'Housing',             value: 'housing',     icon: 'home' },
  { label: 'Insurance',           value: 'insurance',   icon: 'verified_user' },
  { label: 'Education',           value: 'education',   icon: 'school' },
  { label: 'Subscriptions',       value: 'subscriptions', icon: 'subscriptions' },
  { label: 'Taxes',               value: 'taxes',       icon: 'receipt_long' },



  ];
  currencies = [
  { label: 'USD',         value: 'usd',  symbol: '$' },
  { label: 'Euro',              value: 'eur',  symbol: '€' },
  { label: 'British Pound',     value: 'gbp',  symbol: '£' },
  { label: 'Japanese Yen',      value: 'jpy',  symbol: '¥' },
  { label: 'Canadian Dollar',   value: 'cad',  symbol: 'C$' },
  { label: 'Australian Dollar', value: 'aud',  symbol: 'A$' },
  { label: 'Egyptian Pound',    value: 'egp',  symbol: '£E' },
  { label: 'Saudi Riyal',       value: 'sar',  symbol: '﷼' },
  { label: 'UAE Dirham',        value: 'aed',  symbol: 'د.إ' },
  { label: 'Indian Rupee',      value: 'inr',  symbol: '₹' }
];
   constructor() {
     effect(() => {
     
      if(this.currency())
    {  this.expensesService.getExchangeRateWithToUSD(this.currency())
        this.isLoadingExchangeRate.set(true);
    }
    });
     
      effect(() => {
      this.isLoadingExchangeRate.set(false)
      if(this.form?.get('convertedAmount'))
        this.form?.get('convertedAmount').setValue(this.convertedAmount())
    });
  }
  ngOnInit(): void {
   
      // this.expensesService.getExchangeRateWithToUSD('egp')
      this.form = this.fb.group({
      category: ['', Validators.required],
      originalAmount: ['', [Validators.required, Validators.min(0.01)]],
      convertedAmount: ['', [Validators.required, Validators.min(0.01)]],
      date: ['', Validators.required],
      image: [null], // Will be handled via file input
      currency: ['USD', Validators.required],
      icon: [''] // Optional: auto-fill based on category
    });
}
addExpense=()=> {

  // console.log(this.form.value);
  const { image, ...rest}=this.form.value;
  this.expensesService.addExpense({"userId": "u001",imageReceipt:this.imageObject(),convertedAmount:this.convertedAmount(),...rest})
}
goBack(){
  this.location.back();
}
}
