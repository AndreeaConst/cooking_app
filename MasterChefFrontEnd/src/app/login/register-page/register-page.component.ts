import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';
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
    private router: Router,
    private loginService:LoginService
    ){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({

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
        this.loginService.login(response);
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
    return this.firstName?.hasError('required') ? 'You must enter your first name' : true;
  }

  getErrorMessageRequiredLastName() {
    return this.lastName?.hasError('required') ? 'You must enter your last name' : true;
  }

  getErrorMessageRequiredEmailRegister() {
    return this.emailRegister?.hasError('required') ? 'You must enter an email' : true;
  }

  getErrorMessageRequiredPasswordRegister() {
    return this.passwordRegister?.hasError('required') ? 'You must enter a password' : true;
  }

  getErrorMessageLengthPasswordRegister() {
    return this.passwordRegister?.hasError('minlength') ? 'Your password must be at least 6 characters long' : true;
  }

  getErrorMessageRequiredPasswordRegisterConfirm() {
    return this.passwordRegisterConfirm?.hasError('required') ? 'You must enter your password' : true;
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