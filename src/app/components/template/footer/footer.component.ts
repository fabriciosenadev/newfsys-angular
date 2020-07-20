import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/template/header/header.service';

@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    constructor(private headerService: HeaderService) { }

    ngOnInit(): void {
    }

    get routeUrl(): string {
        return this.headerService.headerData.routeUrl;
    }

}
