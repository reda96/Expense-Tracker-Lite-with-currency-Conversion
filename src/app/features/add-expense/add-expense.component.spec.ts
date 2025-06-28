import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AddExpenseComponent } from './add-expense.component';
import { provideHttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ExpensesService } from '../../core/services/expenses.service';

fdescribe('add expense form', () => {
  let component: AddExpenseComponent;
  let fixture: ComponentFixture<AddExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,AddExpenseComponent],
      declarations: [],
       providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should create form with initial values', () => {
    const form = component.form;
    expect(form).toBeDefined();
    expect(form.valid).toBeFalse();
  });

  it('should require all mandatory fields', () => {
    const form = component.form;

    form.patchValue({
      category: '',
      originalAmount: '',
      convertedAmount: '',
      date: '',
      currency: ''
    });

    expect(form.get('category')?.hasError('required')).toBeTrue();
    expect(form.get('originalAmount')?.hasError('required')).toBeTrue();
    expect(form.get('date')?.hasError('required')).toBeTrue();
    expect(form.get('currency')?.hasError('required')).toBeTrue();
  });

  it('should validate amount fields with minimum value', () => {
    const form = component.form;

    form.get('originalAmount')?.setValue(0);
    expect(form.get('originalAmount')?.hasError('min')).toBeTrue();


    form.get('originalAmount')?.setValue(1);
    expect(form.get('originalAmount')?.valid).toBeTrue();
  });

  it('should be valid when all required fields are set correctly', () => {
    component.form.setValue({
      category: 'Groceries',
      originalAmount: 123.45,
      convertedAmount: 100.00,
      date: '2025-06-27',
      image: null,
      currency: 'USD',
      icon: 'shopping_cart'
    });

    expect(component.form.valid).toBeTrue();
  });



  

})


fdescribe('AddExpenseComponent - currency calculations', () => {
  let component: AddExpenseComponent;
  let fixture: ComponentFixture<AddExpenseComponent>;

  // Mock service with observable exchangeRate$
  let mockExchangeRate$: BehaviorSubject<number>;
  const mockExpensesService = {
    exchangeRate$: new BehaviorSubject<number>(0),
    getExchangeRateWithToUSD: jasmine.createSpy('getExchangeRateWithToUSD'),
    addExpense: jasmine.createSpy('addExpense')
  };

  beforeEach(async () => {
    mockExchangeRate$ = new BehaviorSubject(1.5); // Initial mock rate

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AddExpenseComponent],
      providers: [
        FormBuilder,
        { provide: ExpensesService, useValue: { ...mockExpensesService, exchangeRate$: mockExchangeRate$ } },
        { provide: Location, useValue: { back: jasmine.createSpy() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compute convertedAmount correctly from originalAmount and exchangeRate', () => {
    component.originalAmount.set(100); // signal set
    mockExchangeRate$.next(2); // update observable

    // trigger Angular change detection and signals
    fixture.detectChanges();

    // Call the computed signal
    const computedValue = component.convertedAmount();

    expect(computedValue).toBe(200);
  });

  it('should update convertedAmount in the form when signals change', () => {
    component.form.get('originalAmount')?.setValue(50);
    component.originalAmount.set(50);
    mockExchangeRate$.next(3);

    fixture.detectChanges();

    expect(component.form.get('convertedAmount')?.value).toBe(150);
  });
});
