import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {
  // Gestisci lo stato reale con localStorage, cookie, observable, ecc.

  constructor() { }

  private loggedIn$ = new BehaviorSubject<boolean>(this.checkToken());;

  isLoggedIn(): boolean {
    // Esempio: controlla se c’è un token
    return this.loggedIn$.value;
  }

  // Per binding reattivo nell'header
  isLoggedInObservable() {
    return this.loggedIn$.asObservable();
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn$.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn$.next(false);
  }

  private checkToken(): boolean {
    return !!localStorage.getItem('token');
  }

}
