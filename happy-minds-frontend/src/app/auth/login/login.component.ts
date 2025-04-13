import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared/shared.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() toggleForm!: () => void;
  loginForm: FormGroup;
  loginError!: string;
  // Removed redundant router declaration

  constructor(private fb: FormBuilder, private sharedService: SharedService, private http: HttpClient, private translate: TranslateService, public router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required]]
    });

    // Set default language to English
    this.translate.setDefaultLang('en');
  }

  changeLanguage(event: Event) {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    if (selectedLanguage === 'en' || selectedLanguage === 'hi') {
      this.translate.use(selectedLanguage);
    }
  }

  loginUser() {
    console.log(this.loginForm.value);
    const enteredEmail = this.loginForm.get('email')?.value?.trim().toLowerCase();
    const enteredPassword = this.loginForm.get('password1')?.value?.trim();
  
    this.loginError = '';
  
    this.sharedService.loginUser().subscribe(
      (users: any[]) => {
        console.log('All Users:', users);
  
        const matchedUser = users.filter((user: { email: string; password: string; user_id: string; username?: string }) => 
          user.email == enteredEmail && 
          user.password == enteredPassword
        );
  
        console.log('Matched user:', matchedUser);
  
        if (matchedUser) {
          if (matchedUser) {
            localStorage.setItem('userId', matchedUser[0]?.user_id || '');
            localStorage.setItem('userEmail', matchedUser[0]?.email || '');
            localStorage.setItem('username', matchedUser[0]?.username || '');
          }
          localStorage.getItem("isAdmin") === 'true' ? localStorage.setItem('isAdmin', 'true') : localStorage.setItem('isAdmin', 'false');
          
          console.log("User logged in successfully");
          this.router.navigate(['/view-all-therapists']);
        } else {
          this.loginError = this.translate.instant('INVALID_CREDENTIALS');
          console.error('No user found with matching credentials');
        }
      },
      (error) => {
        this.loginError = this.translate.instant('LOGIN_ERROR');
        console.error('Login error:', error);
      }
    );
  }
}
