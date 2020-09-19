import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrepareProfileService } from 'src/app/services/system/prepare-profile.service';
import { SessionService } from 'src/app/services/system/session.service';
import { HeaderService } from 'src/app/services/template/header/header.service';

@Component({
    selector: 'app-prepare-profile',
    templateUrl: 'prepare-profile.component.html',
    styleUrls: ['./prepare-profile.component.css']
})
export class PrepareProfileComponent implements OnInit {

    token = localStorage.getItem('authToken');

    hasScheduling = {
        quantity: 0,
    };


    constructor(
        private router: Router,
        private headerService: HeaderService,
        private sessionService: SessionService,
        private prepareService: PrepareProfileService,
    ) {
        if (!this.token) this.sessionService.forceLogin();
        headerService.headerData = {
            topMenu: '',
        }
    }

    ngOnInit(): void {
        this.checkScheduling();
    }

    checkScheduling() {
        this.prepareService.hasScheduling(this.token).subscribe(returnScheduling => {
            this.hasScheduling = returnScheduling.hasScheduling;

            if (this.hasScheduling.quantity && this.hasScheduling.quantity > 0)
                this.createLaunchingScheduled();
            else
                this.sendToProfile();
        });
    }

    createLaunchingScheduled() {
        this.prepareService.createLaunchingScheduled(this.token)
            .subscribe(() => {
                this.sendToProfile();
            });
    }

    sendToProfile() {
        this.router.navigate(['/app/profile']);
    }
}
