import { Component } from '@angular/core';
import {RouterModule, RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar.component';
import { Sidebar } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,RouterOutlet, Navbar, Sidebar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
