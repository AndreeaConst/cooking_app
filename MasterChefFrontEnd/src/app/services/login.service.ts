import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../interfaces/user";

@Injectable({providedIn: 'root'})
export class LoginService {
    private isLogin = new Subject<boolean>();
    user!: User;

    // Observable string streams
    isLogin$ = this.isLogin.asObservable();

    // Service message commands
    logout() {
        this.isLogin.next(false);
    }

    login() {
        this.isLogin.next(true);
    }
}