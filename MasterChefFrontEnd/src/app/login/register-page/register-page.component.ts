import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.less']
})
export class RegisterPageComponent implements OnInit {

  hide1 = true;
  hide2 = true;
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      Username: ['', Validators.compose(
        [Validators.required]
      )],

      Email: ['', Validators.compose(
        [Validators.required]
      )],

      FirstName: ['', Validators.compose(
        [Validators.required]
      )],

      LastName: ['', Validators.compose(
        [Validators.required]
      )],

      Weight: [''],

      Height: [''],

      Age: [''],

      Password: ['',
        {
          validators: [
            Validators.compose([
              Validators.required,
              Validators.minLength(6)
            ])
          ],
          updateOn: 'blur'
        }],

      passwordRegisterConfirm: ['',
        {
          validators: [
            Validators.compose([
              Validators.required
            ])
          ],
          updateOn: 'blur'
        }]

    })
  }

  async onRegister(rForm: { value: User; reset: () => void; }) {
    this.userService.addUser(rForm.value).subscribe(
      (response: User) => {
        this.router.navigate(['/my-profile']);
      },
      (error: HttpErrorResponse) => {
        alert("Ops!Nu te-am putut inregistra!")
        
      }
    );
  }

  get firstName() {
    return this.registerForm.get("FirstName");
  }

  get lastName() {
    return this.registerForm.get("LastName");
  }

  get emailRegister() {
    return this.registerForm.get("Email");
  }

  get usernameRegister() {
    return this.registerForm.get("Username");
  }

  get passwordRegister() {
    return this.registerForm.get("Password");
  }

  get height(){
    return this.registerForm.get("Height");
  }

  get weight(){
    return this.registerForm.get("Weight");
  }

  get age(){
    return this.registerForm.get("Age");
  }

  get passwordRegisterConfirm() {
    return this.registerForm.get("passwordRegisterConfirm");
  }

  getErrorMessageRequiredFirstName() {
    return this.firstName?.hasError('required') ? 'You must enter a value' : true;
  }

  getErrorMessageRequiredLastName() {
    return this.lastName?.hasError('required') ? 'You must enter a value' : true;
  }

  getErrorMessageRequiredEmailRegister() {
    return this.registerForm.get("emailRegister")?.hasError('required') ? 'You must enter a value' : true;
  }

  getErrorMessageRequiredPasswordRegister() {
    return this.passwordRegister?.hasError('required') ? 'You must enter a value' : true;
  }

  getErrorMessageLengthPasswordRegister() {
    return this.passwordRegister?.hasError('minlength') ? 'Your password must be at least 6 characters long' : true;
  }

  getErrorMessageRequiredPasswordRegisterConfirm() {
    return this.passwordRegisterConfirm?.hasError('required') ? 'You must enter a value' : true;
  }

  getErrorMessageRequiredUsernameRegister() {
    return this.usernameRegister?.hasError('required') ? 'You must enter a value' : true;
  }

  getErrorPasswordsEqual(){
    //return this.passwordRegisterConfirm?.errors?.areEqual(this.passwordRegister?.value) ? 'Your passwords are not the same' : true;
    const matched: boolean = this.passwordRegister?.value === this.passwordRegisterConfirm?.value;

    if (matched) {
      this.registerForm.controls.passwordRegisterConfirm.setErrors(null);
    } else {
      this.registerForm.controls.passwordRegisterConfirm.setErrors({
        notMatched: true
      });
    }

    return matched;
  }

}