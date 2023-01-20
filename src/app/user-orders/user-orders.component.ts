import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../data-type';
import { ProductService } from '../servces/product.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {

  //
  orderData: Order[]|undefined;
  showMessage: boolean = false;
  constructor(private product: ProductService, private router: Router){}

  ngOnInit(){
    this.getOrderList();
  }

  getOrderList(){
    if(!sessionStorage.getItem('user')){
      this.router.navigate(['/']);
    }else{
      this.product.orderListAPI().subscribe((result)=>{
        this.orderData = result;
      })
    }
  }

  cancelOrder(id: number){
    id && this.product.cancelOrderAPI(id).subscribe((result)=>{
      if(result){
        this.getOrderList();
      }
    })
  }

}
