import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User = {
    name: 'Mohamed Ben',
    email: 'med@example.com',
    role: 'Étudiant'
  };

  editedUser: User = { ...this.user };
  isEditMode = false;
  showSuccessMessage = false;
  memberSince = 'Janvier 2024';

  getInitials(): string {
    return this.user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  toggleEditMode(): void {
    if (this.isEditMode) {
      this.cancelEdit();
    } else {
      this.isEditMode = true;
      this.editedUser = { ...this.user };
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.editedUser = { ...this.user };
  }

  saveProfile(): void {
    this.user = { ...this.editedUser };
    this.isEditMode = false;
    this.showSuccessMessage = true;
    
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  changeAvatar(): void {
    alert('Fonctionnalité de changement d\'avatar à implémenter');
  }
}