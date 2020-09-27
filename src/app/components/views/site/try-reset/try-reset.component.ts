import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/system/session.service';
import { HeaderService } from 'src/app/services/template/header/header.service';

@Component({
    selector: 'app-try-reset',
    template: '',
    styleUrls: ['./try-reset.component.css']
})
export class TryResetComponent implements OnInit {

    token = localStorage.getItem('authToken');

    constructor(
        private router: Router,
        private sessionService: SessionService,
        private headerService: HeaderService,
        ) { 
        headerService.headerData = {
            topMenu: '',
        }
    }

    ngOnInit(): void {
        this.router.navigate(['/forgot']);
    }

}
