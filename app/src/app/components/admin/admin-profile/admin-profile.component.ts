import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

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
  message: String;

  changePassword(){
    this.message="";
    
    if(this.user.password!=this.old_password){
      this.message="Wrong password!";
      return;
    }

    if(this.new_password!=this.repeat_new_password){
      this.message="Passwords and confirm password are not same!";
      return;
    }

    this.userService.changePassword(this.user.username,this.old_password,this.new_password).subscribe((msg)=>{
      sessionStorage.clear();
      this.router.navigate(['/login']);
    },
    (error)=>{
      this.message=error.error.error;
    }
    )
  }

}
