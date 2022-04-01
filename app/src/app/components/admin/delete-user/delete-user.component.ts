import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  users:User[]=[];

  getUsers(){
    this.userService.getUsers().subscribe((users:User[])=>{
      console.log(users);
      this.users=users;
    },
    (error)=>{
    
    }
    )
  }

  deleteUser(username){
    this.userService.deleteUser(username).subscribe(()=>{
      this.users=this.users.filter(user=>user.username!=username);
    });
  }

}
