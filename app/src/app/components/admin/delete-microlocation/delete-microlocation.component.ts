import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-delete-microlocation',
  templateUrl: './delete-microlocation.component.html',
  styleUrls: ['./delete-microlocation.component.css']
})
export class DeleteMicrolocationComponent implements OnInit {

  constructor(private locationService:LocationService) { }

  ngOnInit(): void {
    this.getMicrolocations();
  }

  microlocations=[];

  deleteMicrolocation(c,m,n){
    this.locationService.deleteAllMicrolocation(c,m,n).subscribe((msg:any)=>{
      console.log(msg);
      this.getMicrolocations();
    },
    (error)=>{
      console.log(error);
    })
  }

  getMicrolocations(){
    this.locationService.getAllMicrolocations().subscribe((microlocations:any)=>{
      //console.log(microlocations);
      this.microlocations=microlocations;
    },
    (error)=>{
      console.log(error);
    })
  }

}
