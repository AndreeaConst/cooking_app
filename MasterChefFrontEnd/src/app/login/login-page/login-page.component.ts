import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {

  checked = false;
  email = '';
  password = '';

  hide = true;
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      emailLogin: [this.email, Validators.compose(
        [Validators.required]
      )],

      passwordLogin: [this.password,
      {
        validators: [
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            CustomValidators.passwordStrength()
          ])
        ],
        updateOn: 'blur'
      }],

    })
  }

  onClickRememberMe() {

  }

  async onLogin(email: string, password: string) {
  
  }

  get emailLogin() {
    return this.loginForm.get("emailLogin");
  }

  get passwordLogin() {
    return this.loginForm.get("passwordLogin");
  }

  getErrorMessageRequiredEmailLogin() {
    return this.loginForm.get("emailLogin")?.hasError('required') ? 'Please enter your email' : true;
  }

  getErrorMessageRequiredPasswordLogin() {
    return this.passwordLogin?.hasError('required') ? 'Please enter your password' : true;
  }

  getErrorMessageStrengthPasswordLogin() {
    return this.passwordLogin?.errors?.passwordStrength ? 'Your password must contain at least one capital letter, one small letter, one digit and one special character' : true;
  }

  getErrorMessageLengthPasswordLogin() {
    return this.passwordLogin?.hasError('minlength') ? 'Your password must be at least 6 characters long' : true;
  }


}
