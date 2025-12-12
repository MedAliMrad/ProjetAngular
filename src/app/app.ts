// import { Component } from '@angular/core';
// import {RouterModule, RouterOutlet } from '@angular/router';
// import { Navbar } from './navbar/navbar.component';
// import { Sidebar } from './sidebar/sidebar.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterModule,RouterOutlet, Navbar, Sidebar],
//   templateUrl: './app.html',
//   styleUrls: ['./app.css']
// })
// export class AppComponent {}
import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import {Navbar } from './navbar/navbar.component';
import { Sidebar } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    Navbar,
    Sidebar,
    RouterOutlet
  ]
})
export class AppComponent {
  isLoggedIn = false;

  constructor(private auth: AuthService) {
    this.auth.isLoggedIn$.subscribe(value => this.isLoggedIn = value);
  }
}
