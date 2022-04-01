import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem("user"));
    if(!this.user){
      this.router.navigate(['/login']);
    }

    console.log(this.user.image);
  }

  user:any;

  @Input() navItems:any;
  public isCollapsed = false;

  collapseImageMenu=true;

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
