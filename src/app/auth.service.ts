import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Dummy credentials
  private readonly dummyEmail = 'test@example.com';
  private readonly dummyPassword = '123456';

  constructor(private router: Router) {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): boolean {
    // Check against dummy credentials
    if (email === this.dummyEmail && password === this.dummyPassword) {
      localStorage.setItem('authToken', 'dummy-token');
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}

