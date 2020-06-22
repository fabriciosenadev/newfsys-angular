import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { HeaderService } from 'src/app/services/template/header/header.service';
import { UserLogin } from 'src/app/components/models/user.model';
import { SessionService } from 'src/app/services/user/session.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserLogin = {
    email:'',
    password:''
  }

  constructor(
    private headerService: HeaderService,
    private sessionService: SessionService,
    private router: Router
    ) { 
    headerService.headerData = {
      routeUrl: 'login'
    }
  }

  ngOnInit(): void {
  }

  login(): void
  {
    this.sessionService.login(this.user).subscribe(loginReturn => {
      this.user = loginReturn      
      if(loginReturn.token)
      {
        localStorage.setItem('authToken', loginReturn.token);
        // console.log(loginReturn)
        this.router.navigate(['/app/profile']);
      }
    });    
  }

}
