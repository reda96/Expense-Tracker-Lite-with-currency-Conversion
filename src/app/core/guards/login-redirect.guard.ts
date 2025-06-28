import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginRedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
   
  if (authService.isLoggedIn()||localStorage.getItem('currentUser')) {
   
    
    router.navigate(['/dashboard']);
    return false;
  } else {
    return true
  }
};
