import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private readonly NON_FIELD_ERRORS_KEY = 'nonFieldErrors';

  constructor() {
  }

  setFormAPIErrors(form: FormGroup, errors) {
    if (errors) {
      Object.entries(form.controls).forEach(([fieldName, field]) => {
        if (errors.hasOwnProperty(fieldName)) {
          field.setErrors({APIErrors: errors[fieldName]});
        }
      });
      if (errors.hasOwnProperty(this.NON_FIELD_ERRORS_KEY)) {
        form.setErrors({APIErrors: errors[this.NON_FIELD_ERRORS_KEY]});
      }
      if (errors.hasOwnProperty('detail')) {
        form.setErrors({APIErrors: [errors.detail]});
      }
    }
  }
}
