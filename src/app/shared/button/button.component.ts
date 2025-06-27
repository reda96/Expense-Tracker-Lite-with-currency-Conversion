import { Component, Input } from '@angular/core';
import { BaseFormInputComponent } from '../base/base-form-input.directive';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type!:string;
  @Input() label!:string
  @Input() disabled!:boolean;


}
