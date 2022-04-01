import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-add-microlocation',
  templateUrl: './add-microlocation.component.html',
  styleUrls: ['./add-microlocation.component.css']
})
export class AddMicrolocationComponent implements OnInit {

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.getCities();
  }

  city: String= "Choose city";
  municipality: String= "Choose municipality";
  microlocation: String= "Choose microlocation";

  cities=[];
  municipalities=[];
  microlocations=[];

  new_microlocation: String;
  new_street: String;

  success_message: String;
  error_message: String;

  setMunicipalityList(c){
    // c je selektovani grad
    this.city=c;
    this.microlocations=[];
    this.municipality="Choose municipality";
    this.microlocation="Choose microlocation";
    if(this.city!="Choose city"){
      this.getMunicipalities();
    }else{
      this.municipalities=[];
    }
      
  }

  setMicrolocationList(m){
    this.municipality=m;

    if(this.municipality!="Choose municipality"){
      this.getMicrolocations();
    }else{
      this.microlocations=[];
    }

    this.microlocation="Choose microlocation";
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
    this.locationService.getMunicipalitiesForCity(this.city).subscribe((municipalities:any)=>{
      this.municipalities=municipalities[0].municipalities;
    },
    (error)=>{
      console.log(error);
    })
  }


  getMicrolocations(){
    this.locationService.getMicrolocationsForCityAndMunicipality(this.city,this.municipality).subscribe((microlocations:any)=>{
      console.log("Microlocations: ")
      console.log(microlocations);
      this.microlocations=microlocations;
    },
    (error)=>{
      console.log(error);
    })
  }
  
  add(){
    this.error_message="";
    this.success_message="";
    if(this.city=="Choose city"){
      this.error_message = "Please choose city first";
    }else if(this.municipality=="Choose municipality"){
      this.error_message = "Please choose municipality first";
    }else if(this.microlocation=="Choose microlocation"){ // dodavanje microlocacije
      this.locationService.addMicrolocation(this.city,this.municipality,this.new_microlocation).subscribe((res:any)=>{
        this.success_message="Microlocation added!";
        this.getMicrolocations();
      },
      (error)=>{
        console.log(error);
      });
    }else{ // dodavanje ulice
      this.locationService.addStreetToMicrolocation(this.city,this.municipality,this.microlocation,this.new_street).subscribe((res:any)=>{
        this.success_message="Street added!";
      },
      (error)=>{
        console.log(error);
      });
    }
  }

}
