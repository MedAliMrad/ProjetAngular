// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-student-dashboard',
//   templateUrl: './student-dashboard.component.html',
//   styleUrls: ['./student-dashboard.component.css']
// })
// export class StudentDashboardComponent {}
// student-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Course {
  id: number;
  title: string;
  progress: number;
  instructor: string;
  thumbnail: string;
  nextLesson: string;
}

interface Activity {
  id: number;
  type: 'course' | 'certificate' | 'assignment';
  title: string;
  date: string;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  userName: string = 'Mohamed';
  
  stats = [
    { 
      label: 'Cours suivis', 
      value: 5, 
      icon: 'assets/cours.png',
      color: '#667eea',
      change: '+2 ce mois'
    },
    { 
      label: 'Certificats obtenus', 
      value: 2, 
      icon: '🏆',
      color: '#f59e0b',
      change: 'Bravo !'
    },
    { 
      label: 'Heures d\'apprentissage', 
      value: 48, 
      icon: '⏱️',
      color: '#10b981',
      change: '+12h cette semaine'
    },
    { 
      label: 'Progression moyenne', 
      value: 67, 
      icon: '📈',
      color: '#ec4899',
      change: '+15% ce mois',
      suffix: '%'
    }
  ];

  currentCourses: Course[] = [
    {
      id: 1,
      title: 'Développement Web Moderne',
      progress: 45,
      instructor: 'Mohamed Ali Mrad',
      thumbnail: 'assets/web.png',
      nextLesson: 'React Hooks'
    },
    {
      id: 2,
      title: 'Intelligence Artificielle',
      progress: 60,
      instructor: 'Yassine Daoula',
      thumbnail: 'assets/ai.png',
      nextLesson: 'Réseaux de neurones'
    },
    { 
      id: 3,
      title: 'Design UI/UX',
      progress: 90,
      instructor: 'Moenes Gasmi',
      thumbnail: 'assets/uiux.png',
      nextLesson: 'Prototypage Figma'
    }
  ];

  recentActivity: Activity[] = [
    {
      id: 1,
      type: 'course',
      title: 'Nouveau cours complété: JavaScript Avancé',
      date: 'Il y a 2 heures',
    },
    {
      id: 2,
      type: 'certificate',
      title: 'Certificat obtenu: Développement Frontend',
      date: 'Hier',
    },
    {
      id: 3,
      type: 'assignment',
      title: 'Devoir soumis: Projet React',
      date: 'Il y a 3 jours',
    }
  ];

  ngOnInit() {
    // Initialize component
  }

  getProgressColor(progress: number): string {
    if (progress >= 75) return '#10b981';
    if (progress >= 50) return '#f59e0b';
    return '#ef4444';
  }
}