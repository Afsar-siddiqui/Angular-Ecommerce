import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from '../data-type';
import { ProductService } from '../servces/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productId: string|null = '';  //product id
  removeCart:boolean = false; //remove cart button hide/show
  removeFromCart: Product | undefined;
  //
  constructor(private product: ProductService, private route: ActivatedRoute){}

  ngOnInit(){
    //get Product Id
    this.productId = this.route.snapshot.paramMap.get('id');
    //console.log('url id', this.productId);
    
    this.productDetails();
  }

  //
  productData: undefined | Product;
  productDetails(){
    if(this.productId){
      this.product.productDetailsAPI(this.productId).subscribe((result)=>{
        this.productData = result;
        //console.log('product Data',this.productData);

        //check local storage add product
        let cartData = localStorage.getItem('localCart'); 
        
        //check product id and add to cart product value
        if(this.productId && cartData){
          //store into items
          let items = JSON.parse(cartData);
          
          //find the product id or add to cart product id
          items = items.filter((item:Product) => this.productId === item.id.toString());
          //check there are any product inside cart, if it is then show remove cart button
          
          if(items.length){
            this.removeCart = true;
          }else{
            this.removeCart = false;
          }
        }

        //check on load page again
        //find the user data into session storage
        let userData = sessionStorage.getItem('user');
        if(userData){
          let userId = userData && JSON.parse(userData)[0].id;
          this.product.getCartListAPI(userId);
          //check the card quantity
          //call cartQuantity EventEmitter
          this.product.cartQuantity.subscribe((result)=>{
            let item = result.filter((item:Product)=>this.productId?.toString()===item.productId?.toString())
            if(item.length){
              this.removeFromCart=item[0];
              this.removeCart=true;
            }
          });
          
          //check the condition for remove and add to cart button based on user logged in
          this.product.checkCartListAPI(userId).subscribe((result)=>{
            //filer add to cart list
            result.body?.filter((item)=> {
              let check = this.productId === item.productId.toString();
              //if both id is equal then remove cart button will show
              if(check){
                this.removeCart = true;
              }
            });
            
          });

          }
        

      });
    }
  }

  //handel quantity
  productQuantity: number = 1;
  handelQuantity(val: string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity += 1;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity -= 1;
    }else{
      //
    }
  }

  //add product into cart
  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      //check user is not login
      if(!sessionStorage.getItem('user')){
        //console.log('check Quantity ', this.productData);
        //call Add to Cart API 
        this.product.localAddToCartAPI(this.productData);
        this.removeCart = true;
      }else{
        //find the user data into session storage
        let userData = sessionStorage.getItem('user');
        //console.log('JSON ',userData);
        //get the user id
        let userId = userData && JSON.parse(userData)[0].id;
        //console.log('user id ',userId);
        //get product with user for cart
        let cartData: Cart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }
        //
        //console.log('id ', cartData.productId +" check "+ this.productData.id);
        
        //delete id because we have store id into productId
        delete cartData.id;
        //console.log('cart Data with login ',cartData);
        //call login user cart API
        this.product.addToCartAPI(cartData).subscribe((result)=>{
          if(result){
          //console.log('card Data', result);
          //update the cart quantity in the header
          this.product.getCartListAPI(userId);
          this.removeCart = true;
          }
        });
        
        //
      } 
    }
  }

  //
  removeToCart(productId: number|undefined){
    //check product data is present
    if(this.productData){
      //check user is not login
      if(!sessionStorage.getItem('user')){
        this.product.removeToCartAPI(productId!);
        this.removeCart = false;
      }else{
        //find the user data into session storage
        let userData = sessionStorage.getItem('user');
        //console.log('JSON ',userData);
        //get the user id
        let userId = userData && JSON.parse(userData)[0].id;
        //update cart in the header
        this.removeFromCart && this.product.removeToCartListAPI(this.removeFromCart.id).subscribe((result)=>{
          if(result){
            this.product.getCartListAPI(userId);
            this.product.cartQuantity.subscribe();
          }
        });
      }
      this.removeCart=false;
    }
    
  }


}
