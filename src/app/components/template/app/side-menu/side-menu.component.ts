import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/template/header/header.service';

@Component({
    selector: 'app-side-menu',
    templateUrl: 'side-menu.component.html',
    styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

    constructor(private headerService: HeaderService) { }

    ngOnInit(): void {
    }

    get sideMenu(): string {
        return this.headerService.headerData.sideMenu;
    }

}
