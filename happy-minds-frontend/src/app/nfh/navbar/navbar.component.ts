import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isAdmin:boolean = false;
  ngOnInit() {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
   }
   
}
