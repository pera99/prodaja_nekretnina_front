import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-buyer-profile',
  templateUrl: './buyer-profile.component.html',
  styleUrls: ['./buyer-profile.component.css']
})
export class BuyerProfileComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem("user"))
    if(!this.user){
      this.router.navigate(['/login']);
    }

  }

  user: any;

  old_password: String;
  new_password: String;
  repeat_new_password: String;
  message:String;

  changePassword(){
    if(this.user.password!=this.old_password){
      this.message="Wrong password!";
      return;
    }

    if(this.new_password!=this.repeat_new_password){
      this.message="Passwords and confirm password are not same!";
      return;
    }

    this.userService.changePassword(this.user.username,this.old_password,this.new_password).subscribe((msg)=>{
      alert("Ok!");
      sessionStorage.clear();
      this.router.navigate(['/login']);
    },
    (error)=>{
      this.message=error.error.error;
    }
    )
  }
  
}
