import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {

  constructor(private router: Router){}

  ngOnInit(){
    if(!sessionStorage.getItem('user')){
      this.router.navigate(['/']);
    }else{
      console.log("Please login First");
    }
  }
}
