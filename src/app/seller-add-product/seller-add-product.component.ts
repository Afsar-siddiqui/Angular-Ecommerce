import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../servces/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  constructor(private product: ProductService, private router: Router){}

  //add product call services
  addProductMessage: string|undefined;
  showMessage: boolean = false;
  sellerAddProduct(data: Product){
    //console.log(data);
    this.product.sellerAddProductAPI(data).subscribe((result) => {
      if(result){
        this.showMessage = true;
        this.addProductMessage = "Product added successfully"
      }
      setTimeout(()=>(this.addProductMessage = undefined), 3000);
      setTimeout(()=>(this.showMessage = false), 3000);
      //after update 3 seconds it will redirect on home page
      setTimeout(()=>(this.router.navigate(['seller-home'])), 3000);
    });
  }


}
