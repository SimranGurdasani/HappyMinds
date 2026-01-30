import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent {
  @Input() toggleForms!: () => void;
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private sharedService: SharedService, 
    private http: HttpClient,
    private translate: TranslateService
  ) {
    this.signupForm = this.fb.group({
      therapistName: ['', Validators.required],
      city: ['', Validators.required],
      speciality: ['', Validators.required],
      gender: ['', Validators.required],
      years_experience: ['', [Validators.required, Validators.min(0)]]
    });

    translate.setDefaultLang('en');
  }

  changeLanguage(event: Event) {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    if (selectedLanguage === 'en' || selectedLanguage === 'hi') {
      this.translate.use(selectedLanguage);
    }
  }

  createAdmin() {
    if (this.signupForm.valid) {
      const therapistData = { ...this.signupForm.value };
      this.sharedService.createAdmin(therapistData).subscribe(() => console.log("Admin inserted"));
    }
  }
}
