import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agency } from '../models/agency';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http:HttpClient) { }

  uri='http://localhost:4000';


  getAgencies(){
    return this.http.get(`${this.uri}/agencies/agencies`);
  }

  addAgency(agency: Agency){
    return this.http.post(`${this.uri}/agencies/add`,agency);
  }

  getAgency(name){
    const data={
      name: name
    }
    return this.http.post(`${this.uri}/agencies/getAgency`,data);
  }
  
}
