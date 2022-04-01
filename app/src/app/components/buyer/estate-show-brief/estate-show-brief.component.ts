import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estate-show-brief',
  templateUrl: './estate-show-brief.component.html',
  styleUrls: ['./estate-show-brief.component.css']
})
export class EstateShowBriefComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(this.real_estate);
  }

  @Input() real_estate;
}
