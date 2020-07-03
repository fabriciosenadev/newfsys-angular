import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/models/user.model';
import { SystemService } from 'src/app/services/system/system.service';

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
    constructor(private systemService: SystemService) 
    {
        this.userInfo.token = localStorage.getItem('authToken');

        this.systemService.getUserInfo(this.userInfo).subscribe(userInfoReturn => {
            this.userInfo = userInfoReturn;
            this.userInfo.firstName = this.userInfo.data.full_name.split(' ')[0];
        });
    }

    ngOnInit(): void {
    }

}
