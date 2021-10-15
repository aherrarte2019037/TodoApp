import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FormValidation } from 'src/app/utils/form-validation.util.';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.buildLoginForm();

  constructor(private fmBuilder: FormBuilder, private authService: AuthService, public fmValidation: FormValidation) { }

  ngOnInit() {
    this.fmValidation.setForm(this.loginForm);
  }

  buildLoginForm() {
    return this.fmBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      data => {
        if (data.bearerToken) alert('Ingreso exitoso');
      },
      error => {
        if (error?.error?.responseStatus?.errorCode === 'Unauthorized') alert('Usuario o contraseña incorrecta');
      }
    );
  }

}
