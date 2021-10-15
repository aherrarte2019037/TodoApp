import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fmBuilder: FormBuilder, private authService: AuthService, private router: Router, public fmValidation: FormValidation) { }

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
        if (!data.success) return alert(data?.message || 'Registro fallido, intenta otra vez');
        alert(data.message)
        this.router.navigateByUrl("/login");
      },

      error => {
        alert(error?.message?.responseStatus?.message || 'Registro fallido, intenta otra vez');
      }
    );
  }
  
}
