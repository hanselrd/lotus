import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '@app/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    this.authService.login(this.email.value, this.password.value)
      .then(() => {
        let cbUrl = this.route.snapshot.queryParamMap.get('cbUrl');
        this.router.navigate([cbUrl || '']);
        this.snackBar.open('Welcome back!', 'OK', {
          duration: 6000
        });
      })
      .catch(error => {
        this.snackBar.open(error.message, 'OK', {
          duration: 6000
        });
      });
  }

}
