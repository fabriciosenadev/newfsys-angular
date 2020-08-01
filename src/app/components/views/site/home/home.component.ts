import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/template/header/header.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    email: string = '';
    constructor(
        private headerService: HeaderService,
        private userService: UserService,
        private router: Router,
    ) {
        headerService.headerData = {
            topMenu: 'topMenu'
        }
    }

    ngOnInit(): void {
    }

    sendEmail(): void {
        this.userService.userData.email = this.email;
        this.router.navigate(['/register']);
    }

}
