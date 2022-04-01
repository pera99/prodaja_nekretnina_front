import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  constructor(private http:HttpClient) { }

  uri='http://localhost:4000';


  addRealEstate(data){
    return this.http.post(`${this.uri}/realestates/addRealEstate`,data);
  }

  addRealEstateJSON(data){
    return this.http.post(`${this.uri}/realestates/addRealEstateJSON`,data);
  }

  getRealEstatesForAdvertiser(advertiser){
    const data={
      advertiser: advertiser
    }
    return this.http.post(`${this.uri}/realestates/getRealEstatesForAdvertiser`,data);
  }

   // ispraviti ako treba , dodati neki id za real estate
  sellRealEstate(advertiser,name,price){
    const data={
      advertiser: advertiser,
      name: name,
      price: price
    }

    return this.http.post(`${this.uri}/realestates/sellRealEstate`,data);
  }

  updateRealEstate(data){

    return this.http.post(`${this.uri}/realestates/updateRealEstate`,data);
  }

  searchRealEstate(data){
    return this.http.post(`${this.uri}/realestates/searchRealEstate`,data);
  }

  addToFavorites(username,name,advertiser){
    const data={
      username: username,
      name: name,
      advertiser: advertiser
    }
    return this.http.post(`${this.uri}/realestates/addToFavorites`,data);
  }

  getFavorites(username){
    const data={
      username: username,
    }
    return this.http.post(`${this.uri}/realestates/getFavorites`,data);
  }

  removeFromFavorites(username,name,advertiser){
    const data={
      username: username,
      name: name,
      advertiser: advertiser
    }
    return this.http.post(`${this.uri}/realestates/removeFromFavorites`,data);
  }

  searchRealEstateAdvanced(data){
    return this.http.post(`${this.uri}/realestates/searchRealEstateAdvanced`,data);
  }

  get5LastAdvertised(){
    return this.http.get(`${this.uri}/realestates/get5LastAdvertised`);
  }

  getAvgPrice(type,city,municipality,microlocation){
    const data={
      type: type,
      city: city,
      municipality: municipality,
      microlocation: microlocation
    }
    return this.http.post(`${this.uri}/realestates/getAvgPrice`,data);
  }
}
