import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../__services/auth.service';
import { User } from '../__models/user';
import { RoutingService } from '../__services/routing.service';
import { finalize } from 'rxjs/operators';

const checkPasswords = (group: FormGroup) => {
  const pass = group.controls.password.value;
  const confirmPass = group.controls.confirmPassword.value;
  const passesMatch = pass === confirmPass;
  if (!passesMatch) {
    group.controls.confirmPassword.setErrors({notSame: passesMatch});
  }
  return null;
};

const strongPassword = (control: FormControl) => {
  const pass: string = control.value || '';
  const isStrong = pass.length >= 8
    && [/[a-z]/, /[A-Z]/, /[0-9]/].every(regex => regex.test(pass));
  return isStrong ? null : { notStrong: true };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  backendErrors = {};
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: RoutingService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, strongPassword]],
      confirmPassword: [null, [Validators.required]],
    }, { validators: checkPasswords });
  }

  submitForm() {
    if (!this.registerForm.valid) {
      return;
    }
    const user = this.registerForm.value as User;
    this.isLoading = true;
    this.authService.register(user)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
          () => this.router.navigateToLogin(),
          error => this.handleError(error.error),
          null,
      );
  }

  errorMessage(field) {
    return this.backendErrors[field] || `Please input a valid ${field}!`;
  }

  private handleError(error) {
    Object.keys(error).forEach(field => {
      this.registerForm.get(field).markAsTouched();
      this.registerForm.get(field).setErrors({notUnique: true});
      this.registerForm.get(field).markAsDirty();
      this.backendErrors[field] = error[field][0];
    });
  }
}
