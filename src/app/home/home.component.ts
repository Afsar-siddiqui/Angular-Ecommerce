import { Component } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../servces/product.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  //
  constructor(private product: ProductService){}

  ngOnInit(){
    this.sliderProduct();
    this.productList();
  }

  //for Slider carousel 
  popularProducts: undefined|Product[];
  sliderProduct(){
    this.product.popularProductAPI().subscribe((results)=>{
      //console.log('test ',results);
      this.popularProducts=results;
    })
  }

  //product list
  productsList:undefined|Product[];
  productList(){
    this.product.homeListProductAPI().subscribe((results)=>{
      this.productsList = results;
      //console.log(results);
    })
  }

}
