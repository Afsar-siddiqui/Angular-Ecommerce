import { Component } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../servces/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  constructor(private product: ProductService){}

  ngOnInit(){
    this.sellerListProduct();
  }

  //
  productList: undefined | Product[];
  sellerListProduct(){
    this.product.sellerListProductAPI().subscribe((result) => {
      //console.log('result ',result);
      //console.log('result name ',result[0].name);
      this.productList = result;
    });
  }

  //
  showMessage = false;
  deleteMessage: undefined|string;
  //delete product from product list
  sellerDeleteProduct(id:number){
    this.product.sellerDeleteProductAPI(id).subscribe((result)=>{
      console.log(result);
      if(result){
        this.showMessage = true;
        this.deleteMessage = "product Deleted";
      }
      setTimeout(()=>(this.deleteMessage = undefined), 3000);
      setTimeout(()=>(this.showMessage = false), 3000);
      //call agin lst method to update the list
      this.sellerListProduct();
    })
  }
  
}
