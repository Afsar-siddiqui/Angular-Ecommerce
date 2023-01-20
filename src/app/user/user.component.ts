import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, LoginUser, Product, SignUpUser } from '../data-type';
import { ProductService } from '../servces/product.service';
import { UserService } from '../servces/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(private userService: UserService, private router: Router, private product: ProductService){}

  ngOnInit(){
    this.reloadSeller();
  }

  showMessage = false;
  LoginError = "";
  userLogin(data: LoginUser){
    this.userService.userLoginAPI(data).subscribe((result: any)=>{
      console.log("login successful", result);
      if(result && result.body?.length){
        //localStorage.setItem('user', JSON.stringify(result.body));
        sessionStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['user-home']);
        this.localCartToCart();
      }else{
        this.showMessage = true;
        this.LoginError = "Please enter valid credentials!!";
      }
    });
  }

  userSignUp(data: SignUpUser): void{
    this.userService.userSignUpAPI(data).subscribe((result)=>{
      //console.log('user created ',result);
      if(result){
        sessionStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['user-home']);
      }
    });
  }
  //
  showLogin = false;
  openLogin(){
    this.showLogin= false;
  }

  //
  openSignUp(){
    this.showLogin= true;
  }

  //when the browser reload it will still store the data in local storage and not redirect into login page
  reloadSeller(){
    if(sessionStorage.getItem('user')){
      this.userService.isUserLoggedIn.emit(true);
      this.router.navigate(['user-home']);
    }else{
      this.userService.isUserLoggedIn.emit(false);
    }
  }

  //local cart value store into cart API after login
  localCartToCart(){
    //check the localCart has value in local storage
    let data = localStorage.getItem('localCart');
    //check user and get id
    let userData = sessionStorage.getItem('user');
    let userId = userData && JSON.parse(userData)[0].id;
    if(data){
      //convert local cart value into Object form
      let cartDataList: Product[] = JSON.parse(data);
      //console.log(userId);

      //
      cartDataList.forEach((cartProduct:Product, index)=>{
        let cartDataItem: Cart = {
          ...cartProduct,
          productId: cartProduct.id,
          userId
        }
        //delete id
        delete cartDataItem.id;
        //cal the cart API
        this.product.addToCartAPI(cartDataItem).subscribe((result)=>{
          setTimeout(()=>{
            if(result){
              console.log('with login', result);
            }
          },500);
          //remove value from cart after insert all data into cart API
          if(cartDataList.length===index+1){
            localStorage.removeItem('localCart');
          }
        });
      });

    }

    //cart item list
    setTimeout(()=>{
      this.product.getCartListAPI(userId);
    }, 2000);
    
  }


}
