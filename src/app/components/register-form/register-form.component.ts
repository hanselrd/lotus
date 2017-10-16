import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private flashMessagesService: FlashMessagesService,
              private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'confirmPassword': ['', [Validators.required, Validators.minLength(6)]],
      'displayName': ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
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
      })
      .catch(error => {
        this.flashMessagesService.show(error.message, { cssClass: 'alert-danger', timeout: 6000 });
      });
  }

}
