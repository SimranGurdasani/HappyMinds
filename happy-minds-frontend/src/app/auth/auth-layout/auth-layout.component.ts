import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent {
  isLogin = true; // Controls user login/signup
  isAdminLogin = true; // Controls admin login/signup
  backgroundColor = '#ffffff';
  selectedRole: 'user' | 'admin' = 'user';

  adminLoginData = {
    email: '',
    password: ''
  };

  // Toggle between user login and signup
  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  // Toggle between admin login and signup
  toggleForms() {
    this.isAdminLogin = !this.isAdminLogin;
  }

  // Select role (user or admin)
  selectRole(role: 'user' | 'admin') {
    this.selectedRole = role;
    this.isLogin = true; // Reset to login form when switching roles
    this.isAdminLogin = true; // Reset to admin login form when switching roles
  }

  // Handle background color change
  onBackgroundColorChange(color: string) {
    this.backgroundColor = color;
  }

  // Handle admin login submission
  onAdminLoginSubmit() {
    console.log('Admin Login Data:', this.adminLoginData);
    // Add logic to send data to the backend
  }
}
