import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  uri='http://localhost:4000';

  getLocations(){
    return this.http.get(`${this.uri}/locations/locations`);
  }

  getCities(){
    return this.http.get(`${this.uri}/locations/getCities`);
  }

  getMunicipalities(){
    return this.http.get(`${this.uri}/locations/getMunicipalities`);
  }

  getMunicipalitiesForCity(city){
    const data={
      city: city
    }
    return this.http.post(`${this.uri}/locations/getMunicipalitiesForCity`,data);
  }

  getMicrolocationsForCityAndMunicipality(city,municipality){
    console.log("OK")
    console.log(municipality)
    const data={
      city: city,
      municipality: municipality
    }

    return this.http.post(`${this.uri}/locations/getMicrolocationsForCityAndMunicipality`,data);
  }

  addMicrolocation(city,municipality,new_microlocation){
    const data={
      city: city,
      municipality: municipality,
      new_microlocation: new_microlocation
    }
    return this.http.post(`${this.uri}/locations/addMicrolocation`,data);
  }

  addStreetToMicrolocation(city,municipality,microlocation,new_street){
    const data={
      city: city,
      municipality: municipality,
      microlocation: microlocation,
      new_street: new_street
    }
    return this.http.post(`${this.uri}/locations/addStreetToMicrolocation`,data);
  }

  getAllMicrolocations(){
    return this.http.get(`${this.uri}/locations/getMicrolocations`);
  }

  deleteAllMicrolocation(city,municipality,name){
    const data={
      city: city,
      municipality: municipality,
      name: name
    }
    return this.http.post(`${this.uri}/locations/deleteMicrolocation`,data);
  }
}
