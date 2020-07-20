import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from 'src/app/services/template/header/header.service';
import { UserService } from 'src/app/services/user/user.service';

import { UserRegister } from 'src/app/models/user/userRegister.model';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  msg = [];
  user: UserRegister = {
    full_name:'',
    email:'',
    password:'',
    verifyPass: ''
  }

  constructor(
    private headerService: HeaderService,
    private userService: UserService,
    private router: Router
  ) 
  {
    headerService.headerData = {
      routeUrl: 'register'
    }
  }

  ngOnInit(): void {
    this.user.email = this.userEmail;
  }

  get userEmail(): string {
    return this.userService.userData.email;
  }

  newUser(): void    
  {  
    // if (this.user.full_name.trim().length < 8)
    // {
    //   this.userService.showMessage('insert you full name', true);
    // }
    // else if(this.user.verifyPass != this.user.password )
    // {
    //   this.userService.showMessage('passwords doesn\'t match', true);
    // }
    // else 
    // {
      this.userService.register(this.user).subscribe(userReturn => {
        this.user = userReturn
        if(userReturn.success)
        {
          // this.msg = userReturn.success.split(' ');
          this.userService.showMessage(userReturn.success);
          this.router.navigate(['/login']);
        }              
      });
    // }
  }

}
