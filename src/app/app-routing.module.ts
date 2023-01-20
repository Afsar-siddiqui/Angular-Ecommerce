import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'details/:id', component: ProductDetailsComponent},
  {path: 'search/:query', component: SearchComponent},
  {path: 'user', component: UserComponent},
  {path: 'user-home', component: UserHomeComponent},
  {path: 'user-order', component: UserOrdersComponent},
  {path: 'cart', component: CartPageComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'seller', component: SellerAuthComponent},
  {path: 'seller-home', component: SellerHomeComponent, canActivate: [AuthGuard]},
  {path: 'seller-add-product', component: SellerAddProductComponent, canActivate: [AuthGuard]},
  {path: 'seller-update-product/:id', component: SellerUpdateProductComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
