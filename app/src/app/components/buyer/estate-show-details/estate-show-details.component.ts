import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstateService } from 'src/app/services/real-estate.service';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { AgencyService } from 'src/app/services/agency.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-estate-show-details',
  templateUrl: './estate-show-details.component.html',
  styleUrls: ['./estate-show-details.component.css'],
  providers:[NgbCarouselConfig]
})
export class EstateShowDetailsComponent implements OnInit {

  constructor(private agencyService:AgencyService,private userService:UserService,private realEstateService: RealEstateService,private router:Router,config: NgbCarouselConfig) { 
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }
  showNavigationArrows = false;
  showNavigationIndicators = false;


  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem("user"))
    if(!this.user){
      this.router.navigate(['/login']);
    }


    this.terasa = this.real_estate.Characteristics.indexOf('Terasa') > -1;
    this.podrum = this.real_estate.Characteristics.indexOf('Podrum') > -1;
    this.internet = this.real_estate.Characteristics.indexOf('Internet') > -1;
    this.lodja = this.real_estate.Characteristics.indexOf('Lodja') > -1;
    this.garaza = this.real_estate.Characteristics.indexOf('Garaza') > -1;
    this.interfon = this.real_estate.Characteristics.indexOf('interfon') > -1;
    this.balkon = this.real_estate.Characteristics.indexOf('Franc. balkon') > -1;
    this.basta = this.real_estate.Characteristics.indexOf('Sa bastom') > -1;
    this.telefon = this.real_estate.Characteristics.indexOf('Telefon') > -1;
    this.lift = this.real_estate.Characteristics.indexOf('Lift') > -1;
    this.klima = this.real_estate.Characteristics.indexOf('Klima') > -1;


    this.getAdvertiser();
    this.getAveragePrice();
  }

  user:any;

  @Input() real_estate;

  @Input() deSelect:()=>void;

  advertiser;
  agency;
  prosecna_cena;
  shown=false;
  toggleShown(){
    this.shown=!this.shown;
  }

  terasa;
  podrum; 
  internet;
  lodja;
  garaza;
  interfon;
  balkon;
  basta;
  telefon;
  lift;
  klima;

  addToFavorites(){
    this.realEstateService.addToFavorites(this.user.username,this.real_estate.Name,this.real_estate.Advertiser).subscribe((msg)=>{
      console.log("Added to favorites");
    },
    (error)=>{
      console.log(error);
    });
  }


  // sum(cene)/sum(kvadrati)
  getAveragePrice(){
    this.realEstateService.getAvgPrice(this.real_estate.Type,this.real_estate.City,this.real_estate.Municipality,this.real_estate.Microlocation).subscribe((avg:any)=>{
      this.prosecna_cena=avg[0];
      console.log("AVG:");
      console.log(avg);
    },
    (error)=>{
      console.log(error);
    });
  }

  getAgency(name){
    this.agencyService.getAgency(name).subscribe((agency)=>{
      this.agency=agency;
      //console.log(agency);
    })
  }

  getAdvertiser(){
    console.log(this.real_estate.Advertiser);
    this.userService.getAdvertiser(this.real_estate.Advertiser).subscribe((adv:any)=>{
      this.advertiser=adv;
      //console.log(adv);
      if(adv.advertiserType=="agent"){
        this.getAgency(adv.agency);
      }
      
    })
  }
}
