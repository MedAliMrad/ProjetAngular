import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import {Navbar } from './navbar/navbar.component';
import { Sidebar } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ChatbotComponent} from './chatbot/chatbot'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    Navbar,
    Sidebar,
    RouterOutlet,
    ChatbotComponent,
  ]
})
export class AppComponent {
  isLoggedIn = false;

  constructor(private auth: AuthService) {
    this.auth.isLoggedIn$.subscribe(value => this.isLoggedIn = value);
  }
}
