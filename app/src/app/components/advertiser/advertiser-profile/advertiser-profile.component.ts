import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from 'src/app/models/agency';
import { AgencyService } from 'src/app/services/agency.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-advertiser-profile',
  templateUrl: './advertiser-profile.component.html',
  styleUrls: ['./advertiser-profile.component.css']
})
export class AdvertiserProfileComponent implements OnInit {

  constructor(private userService:UserService,private router:Router,private agencyService: AgencyService) { }

  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem("user"))
    if(!this.user){
      this.router.navigate(['/login']);
    }

    this.getAgencies();
  }

  user: any;

  old_password: String;
  new_password: String;
  repeat_new_password: String;

  telephone: String;
  email: String;
  agency: String;
  licence: String;

  agencies=[];

  message_password: String;
  message_update: String;
  message_joinAgency: String;

  changePassword(){
    this.message_password="";
    
    if(this.user.password!=this.old_password){
      this.message_password="Wrong password!";
      return;
    }

    if(this.new_password!=this.repeat_new_password){
      this.message_password="Passwords and confirm password are not same!";
      return;
    }

    this.userService.changePassword(this.user.username,this.old_password,this.new_password).subscribe((msg)=>{
      sessionStorage.clear();
      this.router.navigate(['/login']);
    },
    (error)=>{
      this.message_password=error.error.error;
    }
    )
  }

  updateAdvertiserInfo(){
    if((this.telephone==null || this.telephone=="") && (this.email==null || this.email=="")){
      this.message_update = "Insert data!";
      return;
    }

    this.userService.updateAdvertiser(this.user.username,this.telephone,this.email).subscribe((message)=>{

      this.message_update = "Updated!";
    },
    (error)=>{
      console.log(error);
    })
  }
  

  updateAdvertiserAgency(){
    if(this.licence==null || this.licence==""){
      this.message_joinAgency = "Insert license!";
      return;
    }

    this.userService.updateAdvertiserAgency(this.user.username,this.agency,this.licence).subscribe((message)=>{
      this.user.advertiserType="agent";
      this.user.agency=this.agency;
      this.user.licence=this.licence;
      sessionStorage.setItem("user",JSON.stringify(this.user));
      this.message_joinAgency = "Updated!";
    },
    (error)=>{
      console.log(error);
    })
  }

  getAgencies(){
    this.agencyService.getAgencies().subscribe((agencies:Agency[])=>{
      this.agencies=agencies;
      if(this.user.advertiserType=="agent"){
        this.agency=this.user.agency;
      }else{
        this.agency=this.agencies[0].name
      }
      
      console.log(agencies)
    },
    (error)=>{
      console.log(error);
    })
  }

}
