import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  uri='http://localhost:4000';

  login(username,password){
    const data={
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/login`,data); 
  }

  register(user: any){
    return this.http.post(`${this.uri}/users/register`,user);
  }

  getRegisterRequests(){
    return this.http.get(`${this.uri}/users/requests`);
  }

  getUsers(){
    return this.http.get(`${this.uri}/users/users`);
  }

  acceptRegistration(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/users/accept`,data);
  }

  deleteUser(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/users/delete`,data);
  }

  addUser(user: User){
    return this.http.post(`${this.uri}/users/add`,user);
  }

  updateUser(username: String,new_phone: String, new_birthday:Date){
    const data={
      username: username,
      new_phone: new_phone,
      new_birthday: new_birthday
    }
    return this.http.post(`${this.uri}/users/update`,data);
  }

  changePassword(username,password,new_password){
    const data={
      username: username,
      password: password,
      new_password: new_password
    }
    return this.http.post(`${this.uri}/users/changePassword`,data);
  }

  updateAdvertiser(username,new_phone, new_email){
    const data={
      username: username,
      new_phone: new_phone,
      new_email: new_email
    }
    return this.http.post(`${this.uri}/users/updateAdvertiser`,data);
  }

  updateAdvertiserAgency(username,new_agency, new_licence_number){
    const data={
      username: username,
      new_agency: new_agency,
      new_licence_number: new_licence_number
    }
    return this.http.post(`${this.uri}/users/updateAdvertiserAgency`,data);
  }

  getAdvertiser(username){
    const data={
      username: username,
    }
    return this.http.post(`${this.uri}/users/getAdvertiser`,data);
  }

}
