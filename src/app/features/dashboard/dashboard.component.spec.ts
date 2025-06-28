import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ExpensesService } from '../../core/services/expenses.service';
import { Expense } from '../../core/models/expense';
import { signal } from '@angular/core';

fdescribe('DashboardComponent Pagination Logic', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let expensesServiceSpy: jasmine.SpyObj<ExpensesService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const dummyUser = { id: 'u001', expenses: 100, income: 1000 };
  const dummyExpenses: Expense[] = Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    userId: 'u001',
    category: 'Food',
    icon: 'restaurant',
    originalAmount: 10,
    originalCurrency: 'usd',
    convertedAmount: 10,
    date: '2025-06-01',
    dateInt: 20250601,
  }));

  beforeEach(async () => {
    expensesServiceSpy = jasmine.createSpyObj(
      'ExpensesService',
      ['getExpenses'],
      {
        totalItems: () => 30, // total 3 pages
      }
    );

    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      loggedInUser: () => dummyUser,
    });

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ExpensesService, useValue: expensesServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { expenses: dummyExpenses } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with route data', () => {
    expect(component.expenses().length).toBe(10);
  });

  it('should fetch and append expenses on scroll if more pages exist', () => {
    expensesServiceSpy.getExpenses.and.returnValue(of(dummyExpenses));
    component.currentPage = 1;
    component.totalItems = signal(30);
    spyOnProperty(window, 'scrollY').and.returnValue(1000);
    spyOnProperty(window, 'innerHeight').and.returnValue(800);
    spyOnProperty(document.documentElement, 'scrollHeight').and.returnValue(
      1700
    );

    // Act
    component.onScroll(new Event('scroll'));

    expect(expensesServiceSpy.getExpenses).toHaveBeenCalledWith(
      'u001',
      'month',
      2
    );
  });

  it('should not fetch more if last page reached', () => {
    component.currentPage = 3; // already last page
    component.totalItems = signal(30);

    const spy = spyOn(component, 'filterExpenses');

        spyOnProperty(window, 'scrollY').and.returnValue(1000);
    spyOnProperty(window, 'innerHeight').and.returnValue(800);
    spyOnProperty(document.documentElement, 'scrollHeight').and.returnValue(
      1700
    );

    // Act
    component.onScroll(new Event('scroll'));
    
    expect(spy).not.toHaveBeenCalled();
  });

  it('should replace expenses if page === 1', () => {
    expensesServiceSpy.getExpenses.and.returnValue(of(dummyExpenses));
    component.filterExpenses('month', 1);

    expect(component.expenses().length).toBe(10);
  });

  it('should append expenses if page > 1', () => {
    component.expenses.set(dummyExpenses); // already has 10
    expensesServiceSpy.getExpenses.and.returnValue(of(dummyExpenses));
    component.filterExpenses('month', 2);

    expect(component.expenses().length).toBe(20);
  });
});
