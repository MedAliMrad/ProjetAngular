
import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { ProfileComponent } from './profile/profile.component';
import {ScheduleComponent} from './schedule/schedule'
import { AbsencesComponent } from './absences/absences';

export const AppRoutes: Routes = [
  // Login non requis a l'entree: on desactive la redirection vers /login.
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/student/dashboard', pathMatch: 'full' },

  // Utilisateur
  { path: 'register', component: RegisterComponent },
  { path: 'student/dashboard', component: StudentDashboardComponent },
  { path: 'courses', component: CoursesListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'emploi', component: ScheduleComponent },
  { path: 'absence', component: AbsencesComponent },



  // Wildcard
  // { path: '**', redirectTo: '/login' }
];
