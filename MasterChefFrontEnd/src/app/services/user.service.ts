import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getUserByEmailAndPassword(user: User):Observable<User> {
     return this.http.post<User>(`${this.apiServerUrl}/loginController`, user);
   }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/registerController`, user);
  }

}
