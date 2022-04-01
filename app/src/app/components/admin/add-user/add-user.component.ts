import { Component, OnInit } from '@angular/core';
import { Agency } from 'src/app/models/agency';
import { AgencyService } from 'src/app/services/agency.service';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserService, private agencyService: AgencyService, private locationService: LocationService) { }

  ngOnInit(): void {
    this.getAgencies();
    this.getCities();
  }


  firstname:string="";
  lastname:string="";
  username:string="";
  password:string="";
  confirm_password:string="";
  city:string="Choose city";
  telephone:string="";
  email:string="";
  birthday:Date;
  image:File=null;
  buyer:boolean=true; // ==false onda je advertiser
  independent:boolean=true; // ==false onda je agent
  agency:string="Choose agency";
  licence:number;

  data:any={};

  success_message:String="";
  error_message:String="";

  agencies=[]; 
  cities=[];

  imagePreview: any; // ovo je putanja do slike
  saveImage(event){
    if(event.target.files.length!=1){
      return;
    }
    this.image=<File>event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      console.log(this.imagePreview);
    }
    reader.readAsDataURL(this.image);
  }

  add(){
    //year month day
    //console.log(this.birthday);
    this.success_message="";
    this.error_message="";

    if(this.password!=this.confirm_password){
      this.error_message="Password not match!";
      return;
    }

    let im = new Image();
    im.src=this.imagePreview;

    
    if(im.width<100 || im.width>300){
      this.error_message="Image size is not ok!";
      return;
    }

    if(im.height<100 || im.height>300){
      this.error_message="Image size is not ok!";
      return;
    }

    this.data={};
    this.data.firstname=this.firstname;
    this.data.lastname=this.lastname;
    this.data.username=this.username;
    this.data.password=this.password;
    this.data.confirm_password=this.confirm_password;
    this.data.city=this.city;
    this.data.telephone=this.telephone;
    this.data.email=this.email;
    this.data.birthday=this.birthday;

    //image
    this.data.image=this.imagePreview;

    if(this.buyer){
      this.data.type="buyer"
    }else{
      this.data.type="advertiser";
      if(this.independent){
        this.data.advertiserType="independent";
      }else{
        this.data.advertiserType="agent";
        this.data.agency=this.agency;
        this.data.licence=this.licence;
      }
    }
    
    console.log("DATA:");
    console.log(this.data);

    this.userService.addUser(this.data).subscribe((res)=>{
      if(res["message"]=="ok"){
        this.success_message="User added!";
      }
    },(error)=>{
      //console.log(error.error);
      if(error.error.error=="username"){
        this.error_message="Username already exists!";
      }else if(error.error.error=="email"){
        this.error_message="Email already exists!";
      }else if(error.error.error=="password"){
        this.error_message="Password - wrong format!";
      }else{
        this.error_message=error.error.error;
      }
    });
  }

  getAgencies(){
    this.agencyService.getAgencies().subscribe((agencies:Agency[])=>{
      this.agencies=agencies;
      console.log(agencies)
    },
    (error)=>{
      console.log(error);
    })
  }

  getCities(){
    this.locationService.getCities().subscribe((cities:String[])=>{
      this.cities=cities
    },
    (error)=>{
      console.log(error);
    })
  }

}
