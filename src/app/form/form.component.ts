import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  public existingCustomers = [
    'existingCustomer@gmail.com',
    'jessidevs@testEmail.com',
  ];

  public signup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      this.existingCustomer(),
    ]),
    quantity: new FormControl('', [
      Validators.required,
      Validators.min(2),
      Validators.max(20),
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  get firstName() {
    return this.signup.get('firstName');
  }
  get lastName() {
    return this.signup.get('lastName');
  }
  get email() {
    return this.signup.get('email');
  }
  get quantity() {
    return this.signup.get('quantity');
  }
  get message() {
    return this.signup.get('message');
  }

  existingCustomer(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }

      return !this.existingCustomers.includes(control.value)
        ? null
        : { existingCustomer: true };
    };
  }

  onSubmit() {
    console.log(this.signup.value);
    console.log(this.quantity);
    this.signup.reset();
  }
}
