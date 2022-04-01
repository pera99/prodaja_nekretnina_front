import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstateService } from 'src/app/services/real-estate.service';

@Component({
  selector: 'app-buyer-favorites',
  templateUrl: './buyer-favorites.component.html',
  styleUrls: ['./buyer-favorites.component.css']
})
export class BuyerFavoritesComponent implements OnInit {

  constructor(private realEstateService: RealEstateService,private router:Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem("user"))
    if(!this.user){
      this.router.navigate(['/login']);
    }
    console.log(this.user.lastname);

    this.getFavorites();
  }

  user: any;
  real_estates=[];


  getFavorites(){
    this.realEstateService.getFavorites(this.user.username).subscribe((real_estates:any[])=>{
      console.log(real_estates);
      this.real_estates=real_estates;
    },
    (error)=>{
      console.log(error);
    });
  }

  removeFromFavorites(r){
    this.realEstateService.removeFromFavorites(this.user.username,r.Name,r.Advertiser).subscribe((msg)=>{
      this.getFavorites();
    },
    (error)=>{
      console.log(error);
    });
  }
}
