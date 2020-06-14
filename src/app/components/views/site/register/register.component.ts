import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from 'src/app/services/template/header/header.service';
import { User } from 'src/app/components/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  msg = [];
  user: User = {
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
  }

  newUser(): void
  {
    console.log('retipPassword: ' + this.user.verifyPass, typeof this.user.verifyPass);
    console.log('password: ' + this.user.password, typeof this.user.password);

    if(this.user.verifyPass == this.user.password)
    {
      this.userService.register(this.user).subscribe(userReturn => {
        this.user = userReturn
        console.log(userReturn.success);
        if(userReturn.success)
        {
          this.msg = userReturn.success.split(' ');
        }

              
      });
    }
    else
    {
      console.log('Senhas não conferem');
    }
  }

}
