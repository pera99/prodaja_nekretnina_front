import { Component, OnInit } from '@angular/core';
import { Agency } from 'src/app/models/agency';
import { User } from 'src/app/models/user';
import { AgencyService } from 'src/app/services/agency.service';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private userService: UserService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getUsers();
  }

  users:User[]=[];
  selected:User=null;

  birthday:any;

  success_message:String="";
  error_message:String="";

  getUsers(){
    this.userService.getUsers().subscribe((users:User[])=>{
      console.log(users);
      this.users=users;
    },
    (error)=>{
    
    }
    )
  }


  updateUser(){
      this.userService.updateUser(this.selected.username,this.selected.telephone,this.birthday).subscribe((msg)=>{
        console.log(msg);
        this.success_message="Updated!";
      },
      (error)=>{
      
      }
      )
  }

  selectUser(user){
      this.selected=user;
      this.birthday=this.datepipe.transform(this.selected.birthday, 'yyyy-MM-dd');;      
  }

  back(){
    this.selected=null;
  }
}
