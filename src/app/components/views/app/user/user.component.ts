import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/template/header/header.service';

@Component({
    selector: 'app-user',
    templateUrl: 'user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    constructor(private headerService: HeaderService) { 
        headerService.headerData = {
            topMenu: 'appMenu',
            sideMenu: 'optionsMenu',
        }
    }

    ngOnInit(): void {
    }

}
