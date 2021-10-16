import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormValidation } from 'src/app/utils/form-validation.util.';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.buildLoginForm();

  constructor(
    private fmBuilder: FormBuilder,
    private authService: AuthService,
    public fmValidation: FormValidation,
    private toast: ToastrService,
    private router: Router
  ) { }

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
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      data => {
        this.toast.success(`Bienvenido ${data?.userName}`, `Ingreso exitoso`);
        this.router.navigateByUrl('/home');
      },
      error => {
        if (error?.error?.responseStatus?.errorCode === 'Unauthorized') {
          this.toast.error('Usuario o contraseña incorrecta', 'Ingreso fallido');
        
        } else {
          this.toast.error('Intenta otra vez', 'Ingreso fallido');
        }
      }
    );
  }

}
