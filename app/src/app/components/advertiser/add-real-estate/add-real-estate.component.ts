import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { RealEstateService } from 'src/app/services/real-estate.service';

@Component({
  selector: 'app-add-real-estate',
  templateUrl: './add-real-estate.component.html',
  styleUrls: ['./add-real-estate.component.css']
})
export class AddRealEstateComponent implements OnInit {

  constructor(private locationService: LocationService,private realEstateService: RealEstateService) { }

  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem("user"));
    this.getCities();

    /*window.onerror = function(e){
      console.log("Error!");
    }*/
  }

  name: String;
  type: String="Choose type";
  city: String="Choose city";
  municipality: String="Choose municipality";
  microlocation: String="Choose microlocation";
  street: String;
  area: Number;
  rooms: Number;
  price: Number;
  construction_year: Number;
  state: String="Choose state";
  heating: String="Choose heating";
  floor: Number;
  total_floors: Number;
  parking: String = "Parking";
  monthly_utilities: Number;
  characteristics=[];
  lines=[];
  description: String;
  // oglasivac , uzeti iz sesije i poslati na server kad se submit forma
  user: any;
  // prodato - inicijalno false
  // poslednja izmena - datum

  types=["Apartment","House","Cottage","Premises","Warehouse"];
  states=["originally","renovated","lux"];
  heatings=["CG","EG","TA","gas","floor","heating pumps"];
  all_characteristics=["Terasa","Podrum","Internet","Lodja","Garaza","Interfon","Franc. balkon","Sa bastom","Telefon","Lift","Klima"];
  all_lines=["P1","P2","M5","M6"];
  cities=[];
  municipalities=[];
  microlocations=[];

  success_message: String;
  error_message: String;

  data:any;

  getCities(){
    this.locationService.getCities().subscribe((cities:String[])=>{
      console.log(cities);
      this.cities=cities;
    },
    (error)=>{
      console.log(error);
    });

  }

  getMunicipalities(){
    this.locationService.getMunicipalitiesForCity(this.city).subscribe((municipalities:any)=>{
      this.municipalities=municipalities[0].municipalities;
    },
    (error)=>{
      console.log(error);
    })
  }

  getMicrolocations(){
    this.locationService.getMicrolocationsForCityAndMunicipality(this.city,this.municipality).subscribe((microlocations:any)=>{
      console.log("Microlocations: ")
      console.log(microlocations);
      this.microlocations=microlocations;
    },
    (error)=>{
      console.log(error);
    })
  }

  setMunicipalityList(c){
    // c je selektovani grad
    this.city=c;
    this.microlocations=[];
    this.municipality="Choose municipality";
    this.microlocation="Choose microlocation";
    if(this.city!="Choose city"){
      this.getMunicipalities();
    }else{
      this.municipalities=[];
    }
      
  }

  setMicrolocationList(m){
    this.municipality=m;

    if(this.municipality!="Choose municipality"){
      this.getMicrolocations();
    }else{
      this.microlocations=[];
    }

    this.microlocation="Choose microlocation";
  }


  add(){
    this.error_message="";
    this.success_message="";

    if(this.type=="Choose type"){
      this.error_message="Choose type!"

    }

    this.data={
      Name: this.name,
      Type: this.type,
      City: this.city,
      Municipality: this.municipality,
      Microlocation: this.microlocation,
      Street: this.street,
      Area: this.area,
      Rooms: this.rooms,
      ConstructionYear: this.construction_year,
      State: this.state,
      Heating: this.heating,
      Floor: this.floor,
      TotalFloors: this.total_floors,
      Parking: this.parking,
      MonthlyUtilities: this.monthly_utilities,
      Price: this.price,
      About: this.description,
      Characteristics: this.characteristics,
      Lines: this.lines,
      Advertiser: this.user.username,
      Images: this.images_send,
      advertiserType: this.user.advertiserType
    }

    this.realEstateService.addRealEstate(this.data).subscribe((res:any)=>{
      this.success_message="Real Estate added!";
    },
    (error)=>{
      this.error_message=error.error.error;
    });

  }


  imagePreview: any; // ovo je putanja do slike
  images;
  index=0;
  image:File;

  images_send=[];
  saveImage(event){
    this.error_message="";
    this.success_message="";
    this.images_send=[];
    this.images=event.target.files; // slike
    console.log(this.images);

    const reader = new FileReader();
    reader.onload = () => { // kad je load smesti base64 u niz
      this.imagePreview = reader.result;
      this.images_send.push(this.imagePreview);
      console.log(this.imagePreview);
    }

    reader.onloadend = () =>{ // load end , ako ima jos slika , pretvori u base64
      this.index++;
      if(this.index<this.images.length){
        reader.readAsDataURL(this.images[this.index]);
      }else{
        this.index=0;
      }
      
    }

    if(this.images.length!=0){
      reader.readAsDataURL(this.images[this.index]);
    }

  }


  // JSON upload

  selectedJSONFile: File;
  real_estate_json:any = null;

  onFileChanged(event) {  
    this.error_message="";
    this.success_message="";  
    if(event.target.files.length!=1){ // cancel kad se klikne
      this.real_estate_json=null;
      return;
    }

    this.selectedJSONFile = <File>event.target.files[0];

    const fileReader = new FileReader();

    fileReader.onload = () => {

      try { 
        this.real_estate_json = JSON.parse(<string>fileReader.result);
       } catch (error) {
        //console.log('Here is the error message', error);
        this.error_message = "File is not in json format!";
        this.real_estate_json = null;
       }

    }

    fileReader.onerror = (error) => {
      this.real_estate_json=null;
      console.log("Greska")
    }

    fileReader.readAsText(this.selectedJSONFile, "UTF-8");
  }


  imagePreviewJ: any; // ovo je putanja do slike
  imagesJ;
  indexJ=0;
  imageJ:File;

  images_sendJ=[];
  saveImageJSON(event){
    this.error_message="";
    this.success_message="";
    this.images_sendJ=[];
    this.imagesJ=event.target.files; // slike

    const reader = new FileReader();
    reader.onload = () => { // kad je load smesti base64 u niz
      this.imagePreviewJ = reader.result;
      this.images_sendJ.push(this.imagePreviewJ);
      console.log(this.imagePreviewJ);
    }

    reader.onloadend = () =>{ // load end , ako ima jos slika , pretvori u base64
      this.indexJ++;
      if(this.indexJ<this.imagesJ.length){
        reader.readAsDataURL(this.imagesJ[this.indexJ]);
      }else{
        this.indexJ=0;
      }
      
    }

    if(this.imagesJ.length!=0){
      reader.readAsDataURL(this.imagesJ[this.indexJ]);
    }

  }

  saveJSON(){
    this.error_message="";
    this.success_message="";

    if(this.real_estate_json == null){
      this.error_message = "Unesite JSON!";
      return;
    }else if(this.images_sendJ.length<=0){
      this.error_message = "Unesite Slike!";
      return;
    }


    this.real_estate_json.images = this.images_sendJ;
    this.real_estate_json.advertiser = this.user.username;
    this.real_estate_json.advertiserType = this.user.advertiserType;

    console.log(this.real_estate_json)

    this.realEstateService.addRealEstateJSON(this.real_estate_json).subscribe((res:any)=>{
      this.success_message="Real Estate added!";
    },
    (error)=>{
      this.error_message=error.error.error;
    });

  }


}
