import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidation {
  private form!: FormGroup;

  constructor() {}

  setForm(form: FormGroup) {
    this.form = form;
  }

  getFormControlError(controlName: string): string | null {
    const { errors, invalid, dirty, touched } = this.form.get(controlName)!;

    if( invalid && dirty || invalid && touched ) {
      if( 'required' in errors! ) return 'Campo requerido';
      if( 'minlength' in errors! ) return `Mínimo ${errors.minlength.requiredLength} caracteres`;
      if( 'maxlength' in errors! ) return `Máximo ${errors.maxlength.requiredLength} caracteres`;
      if( 'email' in errors! ) return 'Correo electrónico Inválido';
      if( 'match' in errors! ) return 'Contraseñas no coinciden';
    }

    return null;
  }

  fieldsMatch( controlName: string, matchName: string ) {
    return ( controls: AbstractControl ) => {
      const control = controls.get(controlName);
      const match = controls.get(matchName);

      if( control?.value !== match?.value && match!.value.length > 0 ) {
        match?.setErrors({ match: true });
        return ({ match: true })
      }
      else return null;
    }
  };

}
