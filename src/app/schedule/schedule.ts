import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
interface ScheduleItem {
  day: string;
  time: string;
  course: string;
  type: string;
  duration: number;
  instructor?: string;
  location?: string;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './schedule.html',
  styleUrls: ['./schedule.css']
})
export class ScheduleComponent {
  viewMode: 'week' | 'list' = 'week';
  
  weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  timeSlots = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

  schedule: ScheduleItem[] = [
    { 
      day: 'Lundi', 
      time: '08:00 - 10:00', 
      course: 'Mathématiques Avancées',
      type: 'cours',
      duration: 2,
      instructor: 'Dr. Hamda',
      location: 'Amphi A'
    },
    { 
      day: 'Lundi', 
      time: '14:00 - 16:00', 
      course: 'Algorithmique',
      type: 'tp',
      duration: 2,
      instructor: 'Prof. Barouni',
      location: 'Salle Info 2'
    },
    { 
      day: 'Mardi', 
      time: '10:00 - 12:00', 
      course: 'Physique Quantique',
      type: 'cours',
      duration: 2,
      instructor: 'Dr. Manai',
      location: 'Amphi B'
    },
    { 
      day: 'Mercredi', 
      time: '08:00 - 10:00', 
      course: 'Base de Données',
      type: 'td',
      duration: 2,
      instructor: 'Prof. Donies',
      location: 'Salle 301'
    },
    { 
      day: 'Mercredi', 
      time: '14:00 - 17:00', 
      course: 'Projet Web',
      type: 'projet',
      duration: 3,
      instructor: 'Prof. Mrad',
      location: 'Lab 4'
    },
    { 
      day: 'Jeudi', 
      time: '10:00 - 12:00', 
      course: 'Machine Learning',
      type: 'cours',
      duration: 2,
      instructor: 'Dr. Gasmi',
      location: 'Amphi C'
    },
    { 
      day: 'Vendredi', 
      time: '08:00 - 10:00', 
      course: 'Architecture Logicielle',
      type: 'cours',
      duration: 2,
      instructor: 'Prof. Daoula',
      location: 'Amphi A'
    }
  ];

  getCurrentWeek(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleDateString('fr-FR', { month: 'long' });
    return `${day} ${month}`;
  }

  isToday(day: string): boolean {
    const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });
    return today.charAt(0).toUpperCase() + today.slice(1) === day;
  }

  getScheduleForDay(day: string): ScheduleItem[] {
    return this.schedule.filter(item => item.day === day);
  }

  calculatePosition(time: string): number {
    const startTime = time.split(' - ')[0];
    const [hours, minutes] = startTime.split(':').map(Number);
    const baseHour = 8;
    const hourHeight = 80;
    return (hours - baseHour) * hourHeight + (minutes / 60) * hourHeight;
  }

  calculateHeight(duration: number): number {
    return duration * 80;
  }

  openCourseDetails(item: ScheduleItem): void {
    console.log('Opening details for:', item);
  }
}