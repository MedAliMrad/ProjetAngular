
import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { ProfileComponent } from './profile/profile.component';
import {ScheduleComponent} from './schedule/schedule'
import { StatisticsComponent } from './statistics/statistics.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Utilisateur
  { path: 'register', component: RegisterComponent },
  { path: 'student/dashboard', component: StudentDashboardComponent },
  { path: 'courses', component: CoursesListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'emploi', component: ScheduleComponent },

  // Wildcard
  // { path: '**', redirectTo: '/login' }
];
