import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';
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
    private router: Router,
    private loginService:LoginService
  ) {
    if (this.loginService.cookieService.check("cookieEmail"))
      this.checked = true;
    this.email = loginService.cookieService.get('cookieEmail');
    this.password = loginService.cookieService.get('cookiePassword');
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
    if (this.checked == false) //first time user clicked the button (checked)
    {
      this.loginService.rememberMe(this.emailLogin?.value, this.passwordLogin?.value);
    }
    else {
      this.loginService.cookieService.deleteAll();
    }
  }

  async onLogin(lForm: { value: User; reset: () => void; }) {
    
    this.userService.getUserByEmailAndPassword(lForm.value).subscribe(
     (response) => {
       if(response.FirstName!=null)
       {
       this.loginService.login(response);
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
    return this.emailLogin?.hasError('required') ? 'Please enter your email' : true;
  }

  getErrorMessageRequiredPasswordLogin() {
    return this.passwordLogin?.hasError('required') ? 'Please enter your password' : true;
  }

  getErrorMessageLengthPasswordLogin() {
    return this.passwordLogin?.hasError('minlength') ? 'Your password must be at least 6 characters long' : true;
  }


}
