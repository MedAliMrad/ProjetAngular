import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

 login(email: string, password: string) {
  // Accept all emails and passwords
  this.loggedIn.next(true);
  return true;
}


  logout() {
    this.loggedIn.next(false);
  }
}
