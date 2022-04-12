import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }
  constructor() { }

  ngOnInit(): void {
  }

}
