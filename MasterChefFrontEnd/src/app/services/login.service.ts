import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { LocalStorageService } from "ngx-webstorage";
import { Subject } from "rxjs";
import { User } from "../interfaces/user";

@Injectable({providedIn: 'root'})
export class LoginService {
    private isLogin = new Subject<boolean>();

    constructor(private localStorage:LocalStorageService, public cookieService: CookieService){}
    // Observable string streams
    isLogin$ = this.isLogin.asObservable();

    // Service message commands
    logout() {
        this.isLogin.next(false);
        this.localStorage.clear('user');
    }

    login(response: User) {
        this.isLogin.next(true);
        this.localStorage.store('user', response);
    }

    rememberMe(email: string, password: string) {
        this.cookieService.set("cookieEmail", email);
        this.cookieService.set("cookiePassword", password);
    }
}