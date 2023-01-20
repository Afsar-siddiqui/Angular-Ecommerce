import { Component } from '@angular/core';
import { Form, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, Order } from '../data-type';
import { ProductService } from '../servces/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  showMessage: boolean = false;
  orderMessage = '';
  checkOut: FormGroup;
  constructor(private product: ProductService, private router: Router) {
    this.checkOut = new FormGroup({
      name: new FormControl(""),
      email: new FormControl(),
      address: new FormControl(),
      contact: new FormControl(),
    });
   }

  //declare form group name
  ngOnInit(){
    this.getCartList();
  }

  //order Details
  cartList: Cart[]|undefined;
  totalPrice: number|undefined;
  getCartList(){
    if(!sessionStorage.getItem('user')){
      this.router.navigate(['/']);
      }else{
        this.product.currentCartListAPI().subscribe((result)=>{
          //console.log(result);
          //total price
          this.cartList= result;  //store all cart value inside cart list
          let price = 0;
          result.forEach((item)=>{
            if(item.quantity){
              price = price + (+item.price * item.quantity);
            }
          });
          //total price
          this.totalPrice = price + (price * 5)/100 + 100 - price/10;
          console.log(this.totalPrice);
          //calculate all types of price
          
           
          //cart don't have product then redirect on home page
          
        });
      }
  }

  orderNow(){
    //store checkout form value inside order
    let order = this.checkOut.value;
    console.log(order);
    let user = sessionStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    //console.log('id', userId);
    

    if(this.totalPrice){
      let orderData:Order = {
        ...order,
        totalPrice:this.totalPrice,
        status: 'process',
        userId,
      }

      //
      this.cartList?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.removeToCartListAPI(item.id).subscribe((result)=>{
            console.log('delete item from cart ', result);
          })
          this.product.cartQuantity.emit();
        }, 700)
      })

      //call API
        this.product.orderNowAPI(orderData).subscribe((result)=>{
          if(result){
            this.showMessage = true;
            this.orderMessage = "order added successfully";
            //console.log('order added successfully',result);
            setTimeout(() => {
              this.orderMessage = '';
              this.showMessage = false;
              this.router.navigate(['user-home'])
            }, 4000);
          }

        })
        
      }
  }
  /*orderNow(data: Order){
    console.log(data);
  }*/

}
