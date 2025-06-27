import { Component } from '@angular/core';
import { BaseFormInputComponent } from '../base/base-form-input.directive';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-date-input',
  imports: [SharedModule],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.scss'
})
export class DateInputComponent extends BaseFormInputComponent{

}
