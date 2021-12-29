import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";
import { Subject } from "rxjs";
import { User } from "../interfaces/user";

@Injectable({providedIn: 'root'})
export class LoginService {
    private isLogin = new Subject<boolean>();

    constructor(private localStorage:LocalStorageService){}
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
}