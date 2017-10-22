import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { CustomValidators } from 'ng2-validation';

import { AuthService } from '@app/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private authService: AuthService) { }

  ngOnInit() {
    let password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)])
    this.registerForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': password,
      'confirmPassword': confirmPassword,
      'displayName': ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get displayName() {
    return this.registerForm.get('displayName');
  }

  onRegister() {
    this.authService.register(this.email.value, this.password.value, this.displayName.value)
      .then(() => {
        let cbUrl = this.route.snapshot.queryParamMap.get('cbUrl');
        this.router.navigate([cbUrl || '']);
        this.snackBar.open('Thank you for registering!', 'OK', {
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
