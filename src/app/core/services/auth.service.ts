import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ToastService } from './toast.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private apiUrl = environment.url; // JSON Server UR
  constructor(private http: HttpClient,
    private toast: ToastService,
    private router:Router
  ) { }


  login(loginData:{email:string, password:string}) {
         this.http.get<any[]>(`${this.apiUrl}/users?email=${loginData.email}&password=${loginData.password}`)
         .pipe(tap(res => {
          if(!res?.length)
            this.toast.error('Invalid email or password!');
          else this.router.navigate(['dashboard'])
         })).subscribe();
  }



}
