import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/components/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    userInfo: UserInfo = {
        full_name: '',
        token: '',
        firstName: ''
    }
    constructor(private userService: UserService) 
    {
        this.userInfo.token = localStorage.getItem('authToken');

        this.userService.getInfo(this.userInfo).subscribe(userInfoReturn => {
            console.log(userInfoReturn);
            this.userInfo = userInfoReturn;
            this.userInfo.firstName = this.userInfo.full_name.split(' ')[0];
        });
    }

    ngOnInit(): void {
    }

}
