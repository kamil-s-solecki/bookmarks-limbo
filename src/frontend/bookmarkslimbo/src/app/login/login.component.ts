import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../__services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginFailure = false;
  isLoading = false;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm() {
    if (!this.loginForm.valid) {
      return;
    }
    const credentials = this.loginForm.value;
    this.isLoading = true;
    this.authService.login(credentials.username, credentials.password)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        () => this.router.navigateByUrl(''),
        () => this.loginFailure = true,
        null,
      );
  }
}
