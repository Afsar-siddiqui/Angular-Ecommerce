import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Order, Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  //add product API
  url = 'http://localhost:3000/products';
  sellerAddProductAPI(data: Product){
    return this.http.post(this.url, data);
  }

  //List product
  sellerListProductAPI(){
    return this.http.get<Product[]>(this.url);
  }

  //delete product
  sellerDeleteProductAPI(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  sellerGetProductAPI(id:string){
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  //
  sellerUpdateProductAPI(product: Product){
    return this.http.put(`http://localhost:3000/products/${product.id}`, product);
  }

  //
  popularProductAPI(){
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=3');
  }

  homeListProductAPI(){
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=8');
  }

  productDetailsAPI(id:string){
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  //
  searchProductAPI(query: string){
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`);
  }

  //store value inside cart without login
  cartQuantity = new EventEmitter<Product[]|[]>();
  localAddToCartAPI(data: Product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
      //console.log(localCart);
    }else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      //console.log('cart Data', cartData);
    }
    //for update the header cart value
    this.cartQuantity.emit(cartData);
  }

  //remove product from cart
  removeToCartAPI(productId: number){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      //store and convert JSON to Object
      let items = JSON.parse(cartData);
      //filter the current id product
      items = items.filter((item:Product)=>productId!==item.id);
      console.log('remove Cat', items);
      //set the items value
      localStorage.setItem('localCart', JSON.stringify(items));
      // for update header cart value
      this.cartQuantity.emit(items);
    }
  }

  //stor value inside cart with login
  addToCartAPI(cartData: Cart){
    return this.http.post('http://localhost:3000/cart', cartData);
    
  }

  //get Cart List API
  getCartListAPI(userId: number){
    return this.http.get<Product[]>('http://localhost:3000/cart?userId='+userId, {observe: 'response'}).subscribe((result)=>{
      if(result && result.body){
        //update cart quantity value in the header
        this.cartQuantity.emit(result.body);
      }
    });
  }

  //get Cart List API
  checkCartListAPI(userId: number){
    return this.http.get<Cart[]>('http://localhost:3000/cart?userId='+userId, {observe: 'response'});
  }

  //remove cart value from API
  removeToCartListAPI(cartId: number){
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  //current Cart List
  currentCartListAPI() {
    let userStore = sessionStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>('http://localhost:3000/cart?userId=' + userData[0].id);
  }

  //Checkout page API
  orderNowAPI(data: Order){
    return this.http.post('http://localhost:3000/orders', data);
    //console.log('Order Now API');
  }

  orderListAPI(){
    let userStore = sessionStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>('http://localhost:3000/orders?userId=' + userData[0].id);
  }

  //delete order
  cancelOrderAPI(id:number){
    return this.http.delete('http://localhost:3000/orders/' + id);
  }

}
