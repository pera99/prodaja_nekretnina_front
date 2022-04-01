import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { RealEstateService } from 'src/app/services/real-estate.service';

@Component({
  selector: 'app-advertiser-home',
  templateUrl: './advertiser-home.component.html',
  styleUrls: ['./advertiser-home.component.css']
})
export class AdvertiserHomeComponent implements OnInit {

  constructor(private realEstateService: RealEstateService,private locationService: LocationService) { }

  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem("user"));
    this.getRealEstates();
  }

  user:any;
  real_estates=[];

  public page = 1;
  public pageSize=10;

  getRealEstates(){
    this.realEstateService.getRealEstatesForAdvertiser(this.user.username).subscribe((real_estates:String[])=>{
      console.log(real_estates);
      this.real_estates=real_estates;
    },
    (error)=>{
      console.log(error);
    });
  }


  sellRealEstate(r){
    this.realEstateService.sellRealEstate(this.user.username,r.Name,r.Price).subscribe((msg)=>{
      r.Sold=true;
    },
    (error)=>{
      console.log(error);
    });
  } 

//////

  selected:any=null;
  types=["Apartment","House","Cottage","Premises","Warehouse"];
  states=["originally","renovated","lux"];
  heatings=["CG","EG","TA","gas","floor","heating pumps"];
  all_characteristics=["Terasa","Podrum","Internet","Lodja","Garaza","Interfon","Franc. balkon","Sa bastom","Telefon","Lift","Klima"];
  all_lines=["P1","P2","M5","M6"];

  cities=[];
  municipalities=[];
  microlocations=[];

  /*city: String="Choose city";
  municipality: String="Choose municipality";
  microlocation: String="Choose microlocation";*/

  success_message: String;
  error_message: String;


  selectRealEstate(r){
    this.selected=r;
    this.selected.old_name=this.selected.Name
    this.selected.advertiserType=this.user.advertiserType;
    console.log(this.selected)
    this.getCities();
  }

  deselect(){
    this.selected=null;
    this.success_message="";
    this.error_message="";
  }

  updateRealEstate(){
    this.error_message="";
    this.success_message="";
    this.realEstateService.updateRealEstate(this.selected).subscribe((msg:any)=>{
      if(msg.message=="hour_error"){
        this.error_message = "Wait 1h!";
      }else if(msg.message=="ok"){
        this.success_message="UPDATED!";
      }
      
    },
    (error)=>{
      this.error_message=error.error.error;
    })
  }

  getCities(){
    this.locationService.getCities().subscribe((cities:String[])=>{
      this.cities=cities;

      console.log(this.selected)
      this.setMunicipalityList(this.selected.City,true);
      this.setMicrolocationList(this.selected.Municipality,true);
    },
    (error)=>{
      console.log(error);
    });

  }

  getMunicipalities(){
    this.locationService.getMunicipalitiesForCity(this.selected.City).subscribe((municipalities:any)=>{
      this.municipalities=municipalities[0].municipalities;
    },
    (error)=>{
      console.log(error);
    })
  }

  getMicrolocations(){
    this.locationService.getMicrolocationsForCityAndMunicipality(this.selected.City,this.selected.Municipality).subscribe((microlocations:any)=>{
      console.log("Microlocations: ")
      console.log(microlocations);
      this.microlocations=microlocations;
    },
    (error)=>{
      console.log(error);
    })
  }

  setMunicipalityList(c,init){
    // c je selektovani grad
    this.selected.City=c;
    this.microlocations=[];
    if(init==false){
      this.selected.Municipality="Choose municipality";
      this.selected.Microlocation="Choose microlocation";
    }

    if(this.selected.City!="Choose city"){
      this.getMunicipalities();
    }else{
      this.municipalities=[];
    }
      
  }

  setMicrolocationList(m,init){
    this.selected.Municipality=m;

    if(this.selected.Municipality!="Choose municipality"){
      this.getMicrolocations();
    }else{
      this.microlocations=[];
    }

    if(init==false){
      this.selected.Microlocation="Choose microlocation";
    }
    
  }
}
