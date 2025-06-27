import { Component, inject, OnInit } from '@angular/core';
import { FormComponent } from '../../shared/form/form.component';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [FormComponent, TextInputComponent,ButtonComponent, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  form:any;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
 
  ngOnInit(): void {
     this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
      // Validators.minLength(6)
    });
  }
  login = ()=>{
    
    
    this.authService.login(this.form.value);
  }
}
