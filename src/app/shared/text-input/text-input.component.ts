import { Component } from '@angular/core';
import { BaseFormInputComponent } from '../base/base-form-input.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule,FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  
})
export class TextInputComponent extends BaseFormInputComponent {
   
}
