import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Absence {
  course: string;
  date: string;
  status: 'Présent' | 'Absent' | 'Justifié' | 'Retard';
  instructor?: string;
  reason?: string;
  justified?: boolean;
}

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './absences.html',
  styleUrls: ['./absences.css']
})
export class AbsencesComponent {
  showFilter = false;
  filterStatus = 'all';
  filterCourse = 'all';

  absences: Absence[] = [
    { 
      course: 'Mathématiques Avancées', 
      date: '2025-12-01', 
      status: 'Absent',
      instructor: 'Dr. Hamda',
      reason: 'Absence non justifiée'
    },
    { 
      course: 'Physique Quantique', 
      date: '2025-12-03', 
      status: 'Présent',
      instructor: 'Dr. Manai'
    },
    { 
      course: 'Informatique', 
      date: '2025-12-04', 
      status: 'Absent',
      instructor: 'Prof. Othmani',
      reason: 'Absence non justifiée'
    },
    { 
      course: 'Base de Données', 
      date: '2025-12-05', 
      status: 'Présent',
      instructor: 'Prof. Samia'
    },
    { 
      course: 'Algorithmique', 
      date: '2025-12-06', 
      status: 'Justifié',
      instructor: 'Prof. Boukhris',
      reason: 'Certificat médical',
      justified: true
    },
    { 
      course: 'Machine Learning', 
      date: '2025-12-07', 
      status: 'Présent',
      instructor: 'Dr. Moussa'
    },

  ];

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  applyFilter(): void {
    // Filter logic handled in getFilteredAbsences()
  }

  resetFilter(): void {
    this.filterStatus = 'all';
    this.filterCourse = 'all';
  }

  getFilteredAbsences(): Absence[] {
    return this.absences.filter(absence => {
      const statusMatch = this.filterStatus === 'all' || absence.status === this.filterStatus;
      const courseMatch = this.filterCourse === 'all' || absence.course === this.filterCourse;
      return statusMatch && courseMatch;
    });
  }

  getUniqueCourses(): string[] {
    return [...new Set(this.absences.map(a => a.course))];
  }

  getPresenceCount(): number {
    return this.absences.filter(a => a.status === 'Présent').length;
  }

  getAbsenceCount(): number {
    return this.absences.filter(a => a.status === 'Absent').length;
  }

  getJustifiedCount(): number {
    return this.absences.filter(a => a.status === 'Justifié').length;
  }

  getTotalSessions(): number {
    return this.absences.length;
  }

  getPresencePercentage(): number {
    const total = this.getTotalSessions();
    if (total === 0) return 0;
    return Math.round((this.getPresenceCount() / total) * 100);
  }

  getAbsencePercentage(): number {
    const total = this.getTotalSessions();
    if (total === 0) return 0;
    return Math.round((this.getAbsenceCount() / total) * 100);
  }

  getJustifiedPercentage(): number {
    const total = this.getTotalSessions();
    if (total === 0) return 0;
    return Math.round((this.getJustifiedCount() / total) * 100);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      'Présent': 'status-present',
      'Absent': 'status-absent',
      'Justifié': 'status-justified',
      'Retard': 'status-late'
    };
    return classes[status] || '';
  }

  justifyAbsence(absence: Absence): void {
    const reason = prompt('Motif de justification :');
    if (reason) {
      absence.status = 'Justifié';
      absence.reason = reason;
      absence.justified = true;
    }
  }
}