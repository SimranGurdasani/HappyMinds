import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  @Input() toggleForm!: () => void;

  constructor(private fb: FormBuilder, private sharedService: SharedService, private translate: TranslateService) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password1: ['', Validators.required]
    });
  
    // Set default language to English
    translate.setDefaultLang('en');
  }
  
  changeLanguage(event: Event) {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    if (selectedLanguage === 'en' || selectedLanguage === 'hi') {
      this.translate.use(selectedLanguage);
    }
  }

  onSignUp() {
    // Mark all fields as touched to show validation errors
    this.signupForm.markAllAsTouched();
  
    // Check form validity and password match
    if (this.signupForm.invalid || this.signupForm.hasError('passwordMismatch')) {
      return;
    }
  
    // Prepare the request body according to DB schema
    const requestBody = {
      username: this.signupForm.get('username')?.value,
      email: this.signupForm.get('email')?.value,
      phone_number: this.signupForm.get('phone_number')?.value,
      password: this.signupForm.get('password')?.value
    };
  
    // Call the service
    this.sharedService.createUser(requestBody).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        // Handle successful registration (e.g., redirect to login)
      },
      error: (error) => {
        console.error('Registration failed', error);
        // Handle error (show error message)
      }
    });
  }
  
  // Add this custom validator to your form group
  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirm_password1')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  
  
  
}

