import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, priceSummary, Product } from '../data-type';
import { ProductService } from '../servces/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  //
  showMessage:boolean = false;
  removeCart = false;
  constructor(private product: ProductService, private router: Router){}

  ngOnInit(){
    this.checkUserLoggedIn();
    this.getCartList();
  }

  //get user ID
  userId = 0;
  checkUserLoggedIn() {
    let userData = sessionStorage.getItem('user');
    if (userData) {
      this.userId = userData && JSON.parse(userData)[0].id;
      //check the card quantity
      //call cartQuantity EventEmitter
      this.product.cartQuantity.subscribe();
    }
    
  }

  cartList: Cart[]|undefined;
  getCartList(){
    if(sessionStorage.getItem('user')){
    this.product.currentCartListAPI().subscribe((result)=>{
      console.log(result);
      this.cartList = result;
      //total price
      let price = 0;
      result.forEach((item)=>{
        if(item.quantity){
          price = price + (+item.price * item.quantity);
        }
      });
      //console.log(price);
      //calculate all types of price
      this.priceSummary.price = price;
      this.priceSummary.discount = price/10;
      this.priceSummary.tax = (price * 5)/100;
      this.priceSummary.delivery =100;
      this.priceSummary.total = this.priceSummary.price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discount;
       
      //cart don't have product then redirect on home page
      if(this.cartList.length === 0){
        //console.log("redirect on home page");
        this.router.navigate(['/'])
      }
    });
  }else{
    //check local storage add product
    let cartData = localStorage.getItem('localCart'); 
    console.log("cartData", cartData);
    //check product id and add to cart product value
    if(cartData){
      //store into items
       this.cartList = JSON.parse(cartData);
      //console.log("items", this.cartList);
      
      //find the product id or add to cart product id
      //this.cartList = this.cartList?.filter((item) => id === item.id?.toString());

      //check there are any product inside cart, if it is then show remove cart button
      
      if(this.cartList && this.cartList.length>0){
        this.removeCart = true;
      }else{
        this.removeCart = false;
      }
      //
      this.cartList = JSON.parse(cartData);
      //console.log("after remove", this.cartList);
    }
  }
  }

  cartDeleteProduct(cartId:number|undefined){
    if(!sessionStorage.getItem('user')){
      this.product.removeToCartAPI(cartId!);
    }else{
      cartId && this.product.removeToCartListAPI(cartId).subscribe((result)=>{
        if(result){
          this.getCartList();
          this.product.cartQuantity.subscribe();
        }
      });
    }
  }

  //redirect on check out page
  checkout(){
    if(!sessionStorage.getItem('user')){
    this.router.navigate(['/']);
    }else{
      this.router.navigate(['checkout']);
    }
  }

}
