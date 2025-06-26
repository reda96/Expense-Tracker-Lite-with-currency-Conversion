// base-form-input.component.ts
import { Input, OnInit, Directive } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive() // Allows inheritance without rendering anything
export abstract class BaseFormInputComponent implements OnInit {
  @Input() id:string ='';
  @Input() name:string='';
  @Input() control!: FormControl;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() type:string='';
    ngOnInit(): void {
    if (!this.control) {
      throw new Error('FormControl is required');
    }
  }

  get showError(): boolean {
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  get errorMessage(): string {
    if (this.control.errors?.['required']) return 'This field is required';
    if (this.control.errors?.['minlength']) return 'Too short';
    if (this.control.errors?.['maxlength']) return 'Too long';
    return 'Invalid value';
  }
}
