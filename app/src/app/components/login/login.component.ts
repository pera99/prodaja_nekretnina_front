import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RealEstateService } from 'src/app/services/real-estate.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService,private router:Router,private realEstateService: RealEstateService) { }

  ngOnInit(): void {
    this.get5LastAdvertised();
  }

  username:string="";
  password:string="";
  message:String=""
  real_estates=[];

  login(){
    this.message="";
    this.userService.login(this.username,this.password).subscribe((user:any)=>{
      if(user){
        if(user.type=="buyer"){
          sessionStorage.setItem("user",JSON.stringify(user))
          this.router.navigate(['/buyer/home']);
        }else if(user.type=="advertiser"){
          sessionStorage.setItem("user",JSON.stringify(user))
          this.router.navigate(['/advertiser/home']);
        }else{
          sessionStorage.setItem("user",JSON.stringify(user))
          this.router.navigate(['/admin/home']);
        }
      }else{
        this.message="User not exist!";
      }
    },
    (error)=>{
      this.message="Error!"
    }
    )
  }

  get5LastAdvertised(){
    this.realEstateService.get5LastAdvertised().subscribe((real_estates:any)=>{
      console.log(real_estates);
      this.real_estates=real_estates;
    });
  }

}
