import { Component } from '@angular/core';
import { FormComponent } from '../../shared/form/form.component';
import { TextInputComponent } from '../../shared/text-input/text-input.component';

@Component({
  selector: 'app-add-expense',
  imports: [FormComponent, TextInputComponent],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss'
})
export class AddExpenseComponent {

}
