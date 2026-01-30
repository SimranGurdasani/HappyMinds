import { Component, OnInit } from '@angular/core';
import { DataService, ClientData } from '../data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-aasha-helper',
  templateUrl: './aasha-helper.component.html',
  styleUrls: ['./aasha-helper.component.css']
})
export class AashaHelperComponent implements OnInit {
  collectedData: ClientData[] = [];
  showModal = false;
  currentHelper: any;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadData();
    this.currentHelper = this.authService.currentUserValue;
  }

  loadData() {
    this.dataService.getCollectedData(localStorage.getItem("a_id") ?? 0).subscribe({
      next: (data) => this.collectedData = data,
      error: (error) => console.error('Error fetching data', error)
    });
  }

  openModal() {
    this.showModal = true;
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.showModal = false;
    document.body.classList.remove('modal-open');
  }

  onDataAdded() {
    this.loadData();
    this.closeModal();
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}