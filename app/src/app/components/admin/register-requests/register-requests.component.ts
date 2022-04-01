import { Component, NgZone, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-requests',
  templateUrl: './register-requests.component.html',
  styleUrls: ['./register-requests.component.css']
})
export class RegisterRequestsComponent implements OnInit {

  constructor(private userService:UserService,private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getRegisterRequests();
  }

  users:User[]=[];

  getRegisterRequests(){
    this.userService.getRegisterRequests().subscribe((users:User[])=>{
      console.log(users);
      this.users=users;
    },
    (error)=>{
    
    }
    )
  }

  acceptUser(username){
    this.userService.acceptRegistration(username).subscribe(()=>{
      this.users=this.users.filter(user=>user.username!=username);
    });
  }

  rejectUser(username){
    this.userService.deleteUser(username).subscribe(()=>{
      this.users=this.users.filter(user=>user.username!=username);
    });
  }

}
