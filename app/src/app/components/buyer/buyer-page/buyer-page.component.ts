import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-page',
  templateUrl: './buyer-page.component.html',
  styleUrls: ['./buyer-page.component.css']
})
export class BuyerPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem("user"));
    if(!this.user){
      this.router.navigate(['/login']);
    }
  }

  user:any;

  navItems=[
    {
      path:"/buyer/home",
      name:"Home"
    },
    {
      path:"/buyer/advancedSearch",
      name:"Advanced search"
    },
    {
      path:"/buyer/favorites",
      name:"Favorites"
    }
    

  ]

}
