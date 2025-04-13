import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeTab = 'books'; // Default tab
  isAdmin:boolean = false;
  ngOnInit() {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
   }
}
