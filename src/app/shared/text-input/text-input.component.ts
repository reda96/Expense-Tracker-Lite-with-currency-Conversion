import { Component, Input,signal } from '@angular/core';
import { BaseFormInputComponent } from '../base/base-form-input.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule,FormsModule,CommonModule, MatFormFieldModule, MatInputModule,MatIconModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  
})
export class TextInputComponent extends BaseFormInputComponent {
   @Input() prefix=''
   @Input() valueSignal!:any;


  changeValue(event:any){
    // console.log(event.target.value);
    if(this.valueSignal)
    this.valueSignal.set(event.target.value);
  }



}
