import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
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
 loggedInUser = this.currentUser.asReadonly();
 
  constructor(private http: HttpClient,
    private toast: ToastService,
    private router:Router
  ) { }


  login(loginData:{email:string, password:string}) {
         this.http.get<User[]>(`${this.apiUrl}/users?email=${loginData.email}&password=${loginData.password}`)
         .pipe(tap((res:User[]) => {
          if(!res?.length)
            this.toast.error('Invalid email or password!');
          else {
            this.isAuthenticated.set(true);
            localStorage.setItem('currentUserId', res[0].id)
            this.router.navigate(['dashboard'])}
         })).subscribe();
  }



}
