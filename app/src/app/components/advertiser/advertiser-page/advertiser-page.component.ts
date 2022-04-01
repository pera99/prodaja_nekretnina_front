import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advertiser-page',
  templateUrl: './advertiser-page.component.html',
  styleUrls: ['./advertiser-page.component.css']
})
export class AdvertiserPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navItems=[
    {
      path:"/advertiser/home",
      name:"Home"
    },
    {
      path:"/advertiser/addRealEstate",
      name:"Add Real Estate"
    },
    {
      path:"/advertiser/visualize",
      name:"Visualize"
    }
    

  ]

}
