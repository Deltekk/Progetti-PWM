import { CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    // L’utente è autenticato, può procedere
    return true;
  }
  else {
    // Non autenticato, redirect al login
    router.navigate(['/login']);
    return false;
  }
};
