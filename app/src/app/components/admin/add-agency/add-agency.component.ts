import { Component, OnInit } from '@angular/core';
import { AgencyService } from 'src/app/services/agency.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.css']
})
export class AddAgencyComponent implements OnInit {

  constructor(private agencyService: AgencyService,private locationService: LocationService) { }

  ngOnInit(): void {
    this.getCities();
  }

  name: String;
  address: String;
  city: String = "Choose city";
  telephone: String;
  pib: String;

  cities=[];
  data:any={};
  success_message: String;
  error_message: String;

  add(){
    
    this.data={};
    this.data.name=this.name;
    this.data.address=this.address;
    this.data.city=this.city;
    this.data.telephone=this.telephone;
    this.data.pib=this.pib;

    this.agencyService.addAgency(this.data).subscribe((res)=>{
      if(res["message"]=="ok"){
        this.success_message="Agency added!";
      }
    },(error)=>{
      //console.log(error.error);

    });
  }


  getCities(){
    this.locationService.getCities().subscribe((cities:String[])=>{
      this.cities=cities
      console.log(cities);
    },
    (error)=>{
      console.log(error);
    })
  }
  
}
