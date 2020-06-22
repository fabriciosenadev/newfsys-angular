import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/user/session.service';
import { UserLogin } from 'src/app/components/models/user.model';

@Component({
  selector: 'app-profile',
  template: `
    <p>
      profile works!
    </p>
  `,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // userLogin: UserLogin = {}

  constructor(
    private sessionService: SessionService,
    private router: Router,
    ) {
    let token = localStorage.getItem('authToken');
    console.log('token'+token);
    if(!token)
    {
      this.sessionService.showMessage('please do login', true);
      this.router.navigate(['/login']);
    } 
      
   }

  ngOnInit(): void {
  }

}
