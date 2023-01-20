import { Component, EventEmitter, OnInit } from '@angular/core';
import { SellerService } from '../servces/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{

  constructor(private seller: SellerService, private router: Router){}
  ngOnInit(){
    this.reloadSeller();
  }
  //
  signUpSeller(data: SignUp): void{
    this.seller.sellerSignUpAPI(data).subscribe((result)=>{
      if(result){
        //this will change auth guard condition true when we got signup form
        this.seller.isSellerLoggedIn.next(true);
        //this will store value in browser side local storage
        localStorage.setItem('seller',JSON.stringify(result.body));
        //redirect the url when the condition satisfied
        this.router.navigate(['seller-home']);
        //console.log(result);
      }
    });
  }

  //when the browser reload it will still store the data in local storage
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.seller.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);

    }
  }

  //
  //isLoginError = new EventEmitter<boolean>(false);
  showLoginError = false;
  authError: string = '';
  loginSeller(data: Login): void{
    this.seller.sellerLoginAPI(data).subscribe((result: any)=>{
      if(result){
        if(result && result.body && result.body.length){
          localStorage.setItem('seller',JSON.stringify(result.body));
          //redirect the url when the condition satisfied
          this.router.navigate(['seller-home']);
        }else if(result.body.length == 0){
          this.showLoginError = true;
          console.log("Login Failed");
          this.authError = "Seller Username and password is not match";
        }else{
          this.authError = "unknown error";
        }
        //console.log(result);
        //console.log("length", result.body.length);
      }
    });
  }

  //
  showLogin = false;
  openLogin(){
    this.showLogin = false;
  }
  openSignUp(){
    this.showLogin = true;
  }


}
