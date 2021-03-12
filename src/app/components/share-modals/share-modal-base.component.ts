import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  template: ''
})
export abstract class ShareModalBaseComponent implements OnInit {
  form: FormGroup;
  maxEmailsCount = 5;

  protected constructor(
    protected formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emails: this.formBuilder.array([], Validators.required),
      notes: [null, Validators.maxLength(200)]
    });
    this.addEmail();
  }

  get emails(): FormArray {
    return this.form.get('emails') as FormArray;
  }

  addEmail() {
    if (this.emails.length < this.maxEmailsCount) {
      this.emails.push(this.formBuilder.control(null, [Validators.required, Validators.email]));
    }
  }

  removeEmail(i: number) {
    if (i > 0) {
      this.emails.removeAt(i);
    }
  }

  setErrors(errors) {
    if (errors.hasOwnProperty('notes')) {
      this.form.controls.notes.setErrors({APIErrors: errors.notes});
    }
    if (errors.hasOwnProperty('email')) {
      Object.entries(errors.email).forEach(([indx, emailErrors]) => {
        this.emails.controls[indx].setErrors({APIErrors: emailErrors});
      });
    }
  }

  actionAfterSuccess(response) {
    this.form.reset();
  }

  abstract share();
}
