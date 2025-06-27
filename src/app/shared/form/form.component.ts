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
   @Input() formSubmit!:any;
   
 

   ngOnInit(): void {
  
   }
    onSubmit() {
    
         if (!this.form) return;
    if(this.form?.invalid)
    this.form.markAllAsTouched();

    if (this.form.valid && this.formSubmit) {
      this.formSubmit();
    }
  }
   

}
