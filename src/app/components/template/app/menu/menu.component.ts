import { Component, OnInit } from '@angular/core';

import { SystemService } from 'src/app/services/system/system.service';

import { UserInfo } from '../../../../models/user/userInfo.model';
import { SessionService } from 'src/app/services/system/session.service';

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
    constructor(
        private systemService: SystemService,
        private sessionService: SessionService,
    ) {
        this.userInfo.token = localStorage.getItem('authToken');

        this.systemService.getUserInfo(this.userInfo).subscribe(userInfoReturn => {
            this.userInfo = userInfoReturn;
            this.userInfo.firstName = this.userInfo.data.full_name.split(' ')[0];
        });

        if (!this.userInfo.token) this.sessionService.forceLogin();
    }

    ngOnInit(): void {
    }

}
