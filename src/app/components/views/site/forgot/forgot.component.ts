import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

import { HeaderService } from 'src/app/services/template/header/header.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserResetPass } from 'src/app/models/user/userResetPass.model';

@Component({
  selector: 'app-forgot',
  templateUrl: 'forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  userResetPass: UserResetPass = {
    email: '',
    password: '',
    verifyPass: '',
    userId: 0
  }

  constructor(
    private headerService: HeaderService,
    private userService: UserService,
    private router: Router
    ) {
    headerService.headerData = {
      routeUrl: 'forgot'
    }
   }

  ngOnInit(): void {
  }

  forgotPass(): void 
  {
    this.userService.forgot(this.userResetPass).subscribe(userForgotReturn => {
      this.userResetPass = userForgotReturn; 
      this.userService.showMessage(userForgotReturn.success); 
    });
  }

  resetPass(userId = this.userResetPass.userId.id): void
  {
    this.userResetPass.id = userId;
    this.userService.reset(this.userResetPass).subscribe(userResetReturn => {
      this.userService.showMessage(userResetReturn.success);
      this.router.navigate(['/login']);
    });
  }
}
