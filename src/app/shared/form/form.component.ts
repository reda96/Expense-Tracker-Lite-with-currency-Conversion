import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  
})
export class FormComponent implements OnInit{
   @Input() form!:FormGroup;
   @Output() formSubmit = new EventEmitter();
   
 

   ngOnInit(): void {
  
   }

   submit() { 
    console.log(this.form.value);
        if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      
      
      this.form?.markAllAsTouched();
    }
   }
}
