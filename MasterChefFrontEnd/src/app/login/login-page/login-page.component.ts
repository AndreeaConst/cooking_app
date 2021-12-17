import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectUnsubscribedError } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

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
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      Email: [this.email, Validators.compose(
        [Validators.required]
      )],

      Password: [this.password,
      {
        validators: [
          Validators.compose([
            Validators.required,
            Validators.minLength(6)
          ])
        ],
        updateOn: 'blur'
      }],

    })
  }

  onClickRememberMe() {

  }

  async onLogin(lForm: { value: User; reset: () => void; }) {
    
    this.userService.getUserByEmailAndPassword(lForm.value).subscribe(
     (response: User) => {
       console.log(response);
       if(Object.keys(response).length!=0)
       {
       this.router.navigate(['/my-profile']);
       }
       else
       {
         
         alert("Ops! Datele de autentificare sunt incorecte!")
       }
      }
      
   );
  }

  get emailLogin() {
    return this.loginForm.get("Email");
  }

  get passwordLogin() {
    return this.loginForm.get("Password");
  }

  getErrorMessageRequiredEmailLogin() {
    return this.loginForm.get("emailLogin")?.hasError('required') ? 'Please enter your email' : true;
  }

  getErrorMessageRequiredPasswordLogin() {
    return this.passwordLogin?.hasError('required') ? 'Please enter your password' : true;
  }

  getErrorMessageLengthPasswordLogin() {
    return this.passwordLogin?.hasError('minlength') ? 'Your password must be at least 6 characters long' : true;
  }


}
