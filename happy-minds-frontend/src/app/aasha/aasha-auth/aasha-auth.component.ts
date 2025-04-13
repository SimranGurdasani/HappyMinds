import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-aasha-auth',
  templateUrl: './aasha-auth.component.html',
  styleUrls: ['./aasha-auth.component.css']
})
export class AashaAuthComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { 
    this.loginForm = this.formBuilder.group({
      a_id: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '';
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/aasha-helper';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }


    this.loading = true;
    this.authService.login(this.f['a_id'].value, this.f['password'].value)
      .subscribe(
        data => {
          localStorage.setItem('a_id', this.f['a_id'].value);

          console.log(this.f['a_id'].value);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = 'Invalid ID or password';
          this.loading = false;
        });
  }
}

