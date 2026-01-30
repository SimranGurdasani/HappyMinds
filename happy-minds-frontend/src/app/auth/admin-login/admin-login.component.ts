import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  @Input() toggleForms!: () => void;
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private sharedService: SharedService,
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    translate.setDefaultLang('en');
  }

  changeLanguage(event: Event) {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    if (selectedLanguage === 'en' || selectedLanguage === 'hi') {
      this.translate.use(selectedLanguage);
    }
  }

  loginAdmin() {
    console.log(this.loginForm.value);
    const enteredEmail = this.loginForm.get('email')?.value;
    const enteredPassword = this.loginForm.get('password')?.value;

    this.loginError = '';

    this.sharedService.loginAdmin().subscribe(
      (therapists: any[]) => {
        console.log('All therapists:', therapists);

        const matchedTherapist = therapists.find(therapist => 
          therapist['email'] === enteredEmail && 
          therapist['password'] === enteredPassword
        );

        console.log('Matched therapist:', matchedTherapist);

        if (matchedTherapist) {
          localStorage.setItem('adminId', matchedTherapist['therapistId']);
          localStorage.setItem('isAdmin', 'true');
          localStorage.setItem('adminName', matchedTherapist['therapistName'] || '');
          
          console.log("Admin logged in successfully");
          
          this.router.navigate(['/my-appointments']);
        } else {
          this.loginError = this.translate.instant('INVALID_CREDENTIALS');
          console.error('No matching therapist found');
        }
      },
      (error) => {
        this.loginError = this.translate.instant('LOGIN_ERROR');
        console.error('Login error:', error);
      }
    );
  }
}
