import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { CustomValidators } from 'ng2-validation';

import { AuthService } from '@app/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private authService: AuthService) { }

  ngOnInit() {
    let password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)])
    this.signupForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': password,
      'confirmPassword': confirmPassword,
      'displayName': ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  get displayName() {
    return this.signupForm.get('displayName');
  }

  onSignup() {
    this.authService.signup(this.email.value, this.password.value, this.displayName.value)
      .then(() => {
        let cbUrl = this.route.snapshot.queryParamMap.get('cbUrl');
        this.router.navigate([cbUrl || '']);
        this.snackBar.open('Thank you for joining us!', 'OK', {
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
