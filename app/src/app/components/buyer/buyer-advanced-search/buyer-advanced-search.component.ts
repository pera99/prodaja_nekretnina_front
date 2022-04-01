import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { RealEstateService } from 'src/app/services/real-estate.service';

@Component({
  selector: 'app-buyer-advanced-search',
  templateUrl: './buyer-advanced-search.component.html',
  styleUrls: ['./buyer-advanced-search.component.css']
})
export class BuyerAdvancedSearchComponent implements OnInit {

  constructor(private locationService: LocationService,private realEstateService: RealEstateService) { }

  ngOnInit(): void {
  }

  states=["originally","renovated","lux"];
  heatings=["CG","EG","TA","gas","floor","heating pumps"];
  all_characteristics=["Terasa","Podrum","Internet","Lodja","Garaza","Interfon","Franc. balkon","Sa bastom","Telefon","Lift","Klima"];

  public page = 1;
  public pageSize=10;
  searched:Boolean=false;

  success_message: String;
  error_message: String;

  selected:any=null;

  real_estates=[];

  min_price;
  max_price;
  min_area;
  max_area;
  min_rooms;
  max_rooms;
  year_od;
  year_do;
  advertiser_type=[];
  stanje_nekretnine=[];
  tip_grejanja=[];
  floor_od;
  floor_do;
  mesecne_rezije_od;
  mesecne_rezije_do;
  characteristics=[];


  data: any;
  search(){
    this.data={
    }
    
    if(this.min_price!=undefined || this.min_price!=null){
      this.data.min_price=this.min_price;
    }

    if(this.max_price!=undefined || this.max_price!=null){
      this.data.max_price=this.max_price;
    }

    if(this.min_area!=undefined || this.min_area!=null){
      this.data.min_area=this.min_area;
    }

    if(this.max_area!=undefined || this.max_area!=null){
      this.data.max_area=this.max_area;
    }

    if(this.min_rooms!=undefined || this.min_rooms!=null){
      this.data.min_rooms=this.min_rooms;
    }

    if(this.max_rooms!=undefined || this.max_rooms!=null){
      this.data.max_rooms=this.max_rooms;
    }

    if(this.year_od!=undefined || this.year_od!=null){
      this.data.year_od=this.year_od;
    }

    if(this.year_do!=undefined || this.year_do!=null){
      this.data.year_do=this.year_do;
    }

    if((this.advertiser_type!=undefined || this.advertiser_type!=null) && this.advertiser_type.length>0){
      this.data.advertiser_type=this.advertiser_type;
    }

    if((this.stanje_nekretnine!=undefined || this.stanje_nekretnine!=null) && this.stanje_nekretnine.length>0){
      this.data.stanje_nekretnine=this.stanje_nekretnine;
    }

    if((this.tip_grejanja!=undefined || this.tip_grejanja!=null) && this.tip_grejanja.length>0){
      this.data.tip_grejanja=this.tip_grejanja;
    }

    if(this.floor_od!=undefined || this.floor_od!=null){
      this.data.floor_od=this.floor_od;
    }

    if(this.floor_do!=undefined || this.floor_do!=null){
      this.data.floor_do=this.floor_do;
    }

    if(this.mesecne_rezije_od!=undefined || this.mesecne_rezije_od!=null){
      this.data.mesecne_rezije_od=this.mesecne_rezije_od;
    }

    if(this.mesecne_rezije_do!=undefined || this.mesecne_rezije_do!=null){
      this.data.mesecne_rezije_do=this.mesecne_rezije_do;
    }

    if((this.characteristics!=undefined || this.characteristics!=null) && this.characteristics.length>0){
      this.data.characteristics=this.characteristics;
    }

    console.log(this.data);
    this.realEstateService.searchRealEstateAdvanced(this.data).subscribe((real_estates:any[])=>{
      this.success_message="Real Estate searched!";
      console.log(real_estates);
      this.real_estates=real_estates;
      /*for(let i=0;i<10;i++) delete ovo
        this.real_estates.push(this.real_estates[0]);*/

      this.searched=true;
    },
    (error)=>{
      console.log(error);
    });
  }

  showDetails(r){
    this.selected=r;
  }

  deSelect(){
    this.selected=null;
  }
}
