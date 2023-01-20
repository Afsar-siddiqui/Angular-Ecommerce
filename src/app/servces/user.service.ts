import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { LoginUser, SignUpUser } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //
  isUserLoggedIn = new EventEmitter<boolean>(false);
  url = 'http://localhost:3000/users';
  userSignUpAPI(data: SignUpUser){
    return this.http.post(this.url, data, {observe: 'response'});
  }

  //
  userLoginAPI(data: LoginUser){
    return this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, {observe: 'response'});
  }
}
