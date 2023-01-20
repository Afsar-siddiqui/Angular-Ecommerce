import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../servces/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {

  //store the product id
  //store the product whole data
  productData: undefined | Product;
  productId: string|null = '';
  constructor(private product: ProductService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(){
    //get the id from URL
    this.productId = this.route.snapshot.paramMap.get('id');
    //console.log(this.productId);
    this.sellerGetProduct();
    
  }

  //
  sellerGetProduct(){
    if(this.productId){
      this.product.sellerGetProductAPI(this.productId).subscribe((result)=>{
        //console.log(result);
        this.productData = result;
      });
    }
  }

  //
  showMessage = false;
  updateProductMessage: undefined|string;
  sellerUpdateProduct(data: Product){
    if(this.productData){
      data.id = this.productData.id;
    }
    this.product.sellerUpdateProductAPI(data).subscribe((result)=>{
      if(result){
        this.showMessage = true;
        this.updateProductMessage = 'Update product successfully';
        //console.log('update result ',data);
      }
      //remove the message after 3 seconds
      setTimeout(()=>(this.updateProductMessage = undefined), 3000);
      setTimeout(()=>(this.showMessage = false), 3000);
      //after update 3 seconds it will redirect on home page
      setTimeout(()=>(this.router.navigate(['seller-home'])), 3000);
    });
  }
}
