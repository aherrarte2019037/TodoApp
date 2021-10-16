import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormValidation } from 'src/app/utils/form-validation.util.';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.buildRegisterForm();

  constructor(private fmBuilder: FormBuilder, private authService: AuthService, private router: Router, public fmValidation: FormValidation, private toast: ToastrService) { }

  ngOnInit(){
    this.fmValidation.setForm(this.registerForm);
  }

  buildRegisterForm() {
    return this.fmBuilder.group(
      {
        username : ['', Validators.required],
        firstname: ['', Validators.required],
        lastname : ['', Validators.required],
        email    : ['', Validators.required],
        password : ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [this.fmValidation.fieldsMatch('password', 'confirmPassword')]
      }
    );
  }

  register() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    const { username, firstname, lastname, email, password } = this.registerForm.value;

    const user: User = {
      userName : username,
      firstName: firstname,
      lastName : lastname,
      email    : email,
      password : password
    }

    this.authService.register(user).subscribe(
      data => {
        if (!data.success) {
          this.toast.error(data.message, 'Registro fallido');
          return;
        }
        this.router.navigateByUrl("/login");
        this.toast.success(`Bienvenido ${data?.data?.firstName}`, 'Registro Exitoso');
      },
      error => {
        if (error?.error?.responseStatus?.message === `Email '${user.email}' already exists`) {
          this.toast.error('Correo en uso', 'Registro fallido');
        
        } else if (error?.error?.responseStatus?.message === `User '${user.userName}' already exists`) {
          this.toast.error('Usuario en uso', 'Registro fallido');
          
        } else {
          this.toast.error('Intenta otra vez', 'Registro fallido')
        }
      }
    );
  }
  
}
