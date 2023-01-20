import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../servces/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuType = 'default';
  sellerName = '';
  userName = '';
  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      //console.log("Header ",val.url);
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          //console.log('in seller area');
          //check the menu type for show the menu based on the switch condition
          this.menuType = 'seller';
          //set the value username
          let sellerStore = localStorage.getItem('seller');
          if (sellerStore) {
            //check the local storage has value
            // convert your string data into json to get the username
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            //assigned the user name to sellerName variable
            this.sellerName = sellerData.name;
          }
        } else if (sessionStorage.getItem('user') && val.url.includes('user')) {
          //console.log('in user area');
          //check menu has user
          this.menuType = 'user';
          //set the value username
          let userStore = sessionStorage.getItem('user');
          if (userStore) {
            //check local storage has value
            let userData = userStore && JSON.parse(userStore)[0];
            this.userName = userData.name;

            //
          }
        } else {
          //console.log('out seller area');
          this.menuType = 'default';
        }
      }
    });

    //call method storeCartItems
    this.storeCartItems();
    //call method checkUserLoggedIn
    this.checkUserLoggedIn();
  }

  //logout
  logoutSeller() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  logoutUser() {
    sessionStorage.removeItem('user');
    this.route.navigate(['user']);
    //destroy all cart value after logout
    this.product.cartQuantity.emit([]);
    //when user logout user dashboard will hide
    this.showDashboard = false;
  }

  //search product
  searchResult: undefined | Product[];
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const searchValue = query.target as HTMLInputElement;
      //console.log('search value store: ', searchValue.value);
      this.product.searchProductAPI(searchValue.value).subscribe((result) => {
        //console.log("Result ", result);
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
        //console.log("Result ", this.searchResult );
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  //
  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }

  //
  submitSearch(val: string) {
    this.route.navigate([`search/${val}`]);
    //console.log("search submit", val);
  }

  //
  cartItems = 0;
  storeCartItems() {
    let cartItemsQuantity = localStorage.getItem('localCart');
    if (cartItemsQuantity) {
      this.cartItems = JSON.parse(cartItemsQuantity).length;
    }
    //subscribe cartQuantity EventEmitter for load cartItems
    this.product.cartQuantity.subscribe((items) => {
      this.cartItems = items.length;
    });
  }

  //check user logged in for cart
  showDashboard: boolean = false; //show dashboard and login 
  checkUserLoggedIn() {
    let userData = sessionStorage.getItem('user');
    if (userData) {
      let userId = userData && JSON.parse(userData)[0].id;
      this.product.getCartListAPI(userId);
      //check the card quantity
      //console.log('this.productId ', this.productId);
      //call cartQuantity EventEmitter
      this.product.cartQuantity.subscribe();
      setTimeout(()=>this.showDashboard = true, 3000);
    }
    
  }
}
