import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/user/session.service';
import { UserLogin } from 'src/app/components/models/user.model';
import { HeaderService } from 'src/app/services/template/header/header.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // userLogin: UserLogin = {}

  constructor(
    private sessionService: SessionService,
    private headerService: HeaderService,
    private router: Router
    ) 
    {
        let token = localStorage.getItem('authToken');

        if(!token) this.sessionService.forceLogin();
      
        headerService.headerData = {
            routeUrl: 'app'
        }
   }

  ngOnInit(): void {
  }

}
