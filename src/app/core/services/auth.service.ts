import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ToastService } from './toast.service';
import {  tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private apiUrl = environment.url; // JSON Server UR
 private isAuthenticated = signal(false);
 private currentUser = signal<User | null>(null);
 isLoggedIn = this.isAuthenticated.asReadonly();
 loggedInUser = this.currentUser.asReadonly() ;

  constructor(private http: HttpClient,
    private toast: ToastService,
    private router:Router
  ) { 
  if(!this.currentUser() && localStorage.getItem('currentUser'))
     this.currentUser.set(JSON.parse(localStorage.getItem('currentUser') ||''))
  }


  login(loginData:{email:string, password:string}) {
         this.http.get<User[]>(`${this.apiUrl}/users?email=${loginData.email}&password=${loginData.password}`)
         .pipe(tap((res:User[]) => {
          if(!res?.length)
            this.toast.error('Invalid email or password!');
          else {
            this.isAuthenticated.set(true);
            localStorage.setItem('currentUser', JSON.stringify(res[0]));
            this.currentUser.set(res[0])
            this.router.navigate(['/dashboard'])}
         })).subscribe();
  }
logout() {
     localStorage.removeItem('currentUser');
     this.currentUser.set(null);
     this.isAuthenticated.set(false);
     
     this.router.navigateByUrl('/login')

}


}
