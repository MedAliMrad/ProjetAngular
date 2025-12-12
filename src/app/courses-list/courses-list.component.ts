import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  searchTerm = '';
  
  courses: Course[] = [
    {
      id: 1,
      title: 'Angular 20 pour Débutants',
      description: 'Apprenez Angular étape par étape avec des projets concrets.',
      thumbnail: 'assets/angular.png'
    },
    {
      id: 2,
      title: 'NestJS Avancé',
      description: 'Backend moderne et scalable avec les meilleures pratiques.',
      thumbnail: 'assets/nestJs.png'
    },
    {
      id: 3,
      title: 'TypeScript Pro',
      description: 'Maîtrisez TypeScript pour des applications robustes.',
      thumbnail: 'assets/ts.png'
    }
  ];

  constructor(private router: Router) {}

  filteredCourses(): Course[] {
    if (!this.searchTerm.trim()) {
      return this.courses;
    }
    
    const term = this.searchTerm.toLowerCase().trim();
    return this.courses.filter(course =>
      course.title.toLowerCase().includes(term) ||
      course.description.toLowerCase().includes(term)
    );
  }

  openCourse(id: number): void {
    this.router.navigate(['/course', id]);
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onSearchChange(): void {
    // Optional: Add debounce logic here if searching from API
  }
}