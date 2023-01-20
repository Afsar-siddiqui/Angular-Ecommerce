import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  signupUrl:string = 'http://localhost:3000/seller';
  constructor(private http: HttpClient) { }

  //Sign Up Service
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  sellerSignUpAPI(data: SignUp){
    //Call SignUp API
    return this.http.post(this.signupUrl,data, {observe: 'response'});
  }

  //
  sellerLoginAPI(data: Login){
    return this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {observe: 'response'});
    //console.log(data);
  }
}
