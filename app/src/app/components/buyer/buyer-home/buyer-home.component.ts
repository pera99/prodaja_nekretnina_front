import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { RealEstateService } from 'src/app/services/real-estate.service';

@Component({
  selector: 'app-buyer-home',
  templateUrl: './buyer-home.component.html',
  styleUrls: ['./buyer-home.component.css']
})
export class BuyerHomeComponent implements OnInit {

  constructor(private locationService: LocationService,private realEstateService: RealEstateService) { }

  ngOnInit(): void {
    this.getCities();
    this.getMunicipalities();
    this.getMicrolocations();
  }

  types=["Apartment","House","Cottage","Premises","Warehouse"];
  cities=[];
  municipalities=[];
  microlocations=[];
  room_nums=[1,1.5,2,2.5,3,3.5,4,4.5,5]

  type: String = "Choose type"
  city: String = "Choose city";
  municipality: String = "Choose municipality";
  microlocation: String = "Choose microlocation";
  max_price: Number;
  min_area: Number;
  min_rooms: string="Rooms(min)";


  real_estates=[];
  data: any;

  public page = 1;
  public pageSize=10;
  searched:Boolean=false;

  success_message: String;
  error_message: String;

  search(){
    this.data={
      type: this.type
    }
    
    if(this.city!="Choose city"){
      this.data.city=this.city;
    }

    if(this.municipality!="Choose municipality"){
      this.data.municipality=this.municipality;
    }

    if(this.microlocation!="Choose microlocation"){
      this.data.microlocation=this.microlocation;
    }

    if(this.max_price!=undefined || this.max_price!=null){
      this.data.max_price=this.max_price;
    }

    if(this.min_area!=undefined || this.min_area!=null){
      this.data.min_area=this.min_area;
    }

    if(this.min_rooms!="Rooms(min)"){
      this.data.min_rooms=parseFloat(this.min_rooms);
    }

    this.realEstateService.searchRealEstate(this.data).subscribe((real_estates:any[])=>{
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


  selected:any=null;
  showDetails(r){
    this.selected=r;
  }

  deSelect(){
    this.selected=null;
  }


  getCities(){
    this.locationService.getCities().subscribe((cities:String[])=>{
      this.cities=cities
    },
    (error)=>{
      console.log(error);
    })
  }

  getMunicipalities(){
    this.municipalities=[];
    this.locationService.getMunicipalities().subscribe((municipalities:any)=>{
      console.log(municipalities);
      //this.municipalities=municipalities[0].municipalities;
      for(let i=0;i<municipalities.length;i++){
        this.municipalities=this.municipalities.concat(municipalities[i].municipalities);
      }
    },
    (error)=>{
      console.log(error);
    })
  }

  getMunicipalitiesForCity(){
    this.locationService.getMunicipalitiesForCity(this.city).subscribe((municipalities:any)=>{
      this.municipalities=municipalities[0].municipalities;
    },
    (error)=>{
      console.log(error);
    })
  }

  getMicrolocations(){
    this.locationService.getAllMicrolocations().subscribe((microlocations:any)=>{
      this.microlocations=microlocations;
    },
    (error)=>{
      console.log(error);
    })
  }

  getMicrolocationsForCityAndMunicipality(){
    this.locationService.getMicrolocationsForCityAndMunicipality(this.city,this.municipality).subscribe((microlocations:any)=>{
      console.log("Microlocations: ")
      console.log(microlocations);
      this.microlocations=microlocations;
    },
    (error)=>{
      console.log(error);
    })
  }

  setMunicipalityList(c){
    // c je selektovani grad
    this.city=c;
    this.municipality="Choose municipality";
    if(this.city!="Choose city"){
      this.getMunicipalitiesForCity();
    }else{
      this.getMunicipalities();
    }
      
    this.getMicrolocations();
  }


  
  setMicrolocationList(m){
    this.municipality=m;

    if(this.municipality!="Choose municipality" && this.city!="Choose city"){
      this.getMicrolocationsForCityAndMunicipality();
    }else{
      this.getMicrolocations();
    }

    this.microlocation="Choose microlocation";
  }
}
