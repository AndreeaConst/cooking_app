import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  // public getCustomerByEmailAndPassword(email: string, password: string): Observable<Customer> {
  //   return this.http.get<Customer>(`${this.apiServerUrl}/customer/find/${email}/${password}`);
  // }

  // public getCustomerByEmail(email: string): Observable<Customer> {
  //   return this.http.get<Customer>(`${this.apiServerUrl}/customer/find/${email}`);
  // }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/registerController`, user);
  }

  // public updateCustomer(customer: Customer): Observable<Customer> {
  //   return this.http.put<Customer>(`${this.apiServerUrl}/customer/update`, customer);
  // }

  // public deleteCustomer(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiServerUrl}/customer/delete/${id}`);
  // }
}
