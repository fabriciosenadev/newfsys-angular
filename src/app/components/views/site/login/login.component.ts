import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/template/header/header.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private headerService: HeaderService) { 
    headerService.headerData = {
      routeUrl: 'login'
    }
  }

  ngOnInit(): void {
  }

}
