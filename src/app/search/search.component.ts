import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../servces/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private router: Router, private route: ActivatedRoute, private product: ProductService){}

  queryResult: string|null = '';
  ngOnInit(){
    //get the id from URL
    this.queryResult = this.route.snapshot.paramMap.get('query');
    //console.log("url ", this.queryResult);
    this.searchProduct();
  }

  //search product
  showMessage = false;
  notFound = "";
  searchResult: undefined|Product[];
  searchProduct(){
    if(this.queryResult && this.queryResult !=''){
      this.product.searchProductAPI(this.queryResult).subscribe((result)=>{
        //console.log("Result ", result);
        if(result.length>0){
          this.searchResult = result;
        }else{
          this.showMessage = true;
          this.notFound = "No result found";
          //console.log("error: ", this.notFound);
        }
        //console.log("Result ", this.searchResult );
      })
    }
  }

}
