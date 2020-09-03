import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/system/session.service';
import { HeaderService } from 'src/app/services/template/header/header.service';
import { SystemService } from 'src/app/services/system/system.service';
import { Month } from 'src/app/models/month.model';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    // userLogin: UserLogin = {}
    token = localStorage.getItem('authToken');
    date: Date = new Date();
    // year: any = this.date.getFullYear();
    year: any;
    click: number = 1;
    month: Month;

    january: string = '01';
    february: string = '02';
    march: string = '03';
    april: string = '04';
    may: string = '05';
    june: string = '06';
    july: string = '07';
    august: string = '08';
    september: string = '09';
    october: string = '10';
    november: string = '11';
    december: string = '12';

    januaryReceived: number = 0;
    januaryPaid: number = 0;
    januaryTotal: number = 0;

    februaryReceived: number = 0;
    februaryPaid: number = 0;
    februaryTotal: number = 0;

    marchReceived: number = 0;
    marchPaid: number = 0;
    marchTotal: number = 0;

    aprilReceived: number = 0;
    aprilPaid: number = 0;
    aprilTotal: number = 0;

    mayReceived: number = 0;
    mayPaid: number = 0;
    mayTotal: number = 0;

    juneReceived: number = 0;
    junePaid: number = 0;
    juneTotal: number = 0;

    julyReceived: number = 0;
    julyPaid: number = 0;
    julyTotal: number = 0;

    augustReceived: number = 0;
    augustPaid: number = 0;
    augustTotal: number = 0;

    septemberReceived: number = 0;
    septemberPaid: number = 0;
    septemberTotal: number = 0;

    octoberReceived: number = 0;
    octoberPaid: number = 0;
    octoberTotal: number = 0;

    novemberReceived: number = 0;
    novemberPaid: number = 0;
    novemberTotal: number = 0;

    decemberReceived: number = 0;
    decemberPaid: number = 0;
    decemberTotal: number = 0;


    constructor(
        private headerService: HeaderService,
        private systemService: SystemService,
        private router: Router,
    ) {
        headerService.headerData = {
            topMenu: 'appMenu',
            sideMenu: 'launchMenu',
        }
    }

    ngOnInit(): void {
        this.year = this.date.getFullYear();
        this.getMonth();
    }

    decreaseYear(): void {
        this.year--;
        this.getMonth();
    }

    increaseYear(): void {
        this.year++;
        this.getMonth();
    }

    getMonth(): void {
        this.getJanuary();
        this.getFebruary();
        this.getMarch();
        this.getApril();
        this.getMay();
        this.getJune();
        this.getJuly();
        this.getAugust();
        this.getSeptember();
        this.getOctober();
        this.getNovember();
        this.getDecember();
    }

    getJanuary(): void {
        this.systemService.getMonth(this.year, this.january, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.januaryReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.januaryPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
        });
    }

    getFebruary(): void {
        this.systemService.getMonth(this.year, this.february, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.februaryReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.februaryPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
        });
    }

    getMarch(): void {
        this.systemService.getMonth(this.year, this.march, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.marchReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.marchPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
        });
    }

    getApril(): void {
        this.systemService.getMonth(this.year, this.april, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.aprilReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.aprilPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
        });
    }

    getMay(): void {
        this.systemService.getMonth(this.year, this.may, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.mayReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.mayPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
        });
    }

    getJune(): void {
        this.systemService.getMonth(this.year, this.june, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.juneReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.junePaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
        });
    }

    getJuly(): void {
        this.systemService.getMonth(this.year, this.july, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.julyReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.julyPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
        });
    }

    getAugust(): void {
        this.systemService.getMonth(this.year, this.august, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.augustReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.augustPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
        });
    }

    getSeptember(): void {
        this.systemService.getMonth(this.year, this.september, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.septemberReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.septemberPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
        });
    }

    getOctober(): void {
        this.systemService.getMonth(this.year, this.october, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.octoberReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.octoberPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
        });
    }

    getNovember(): void {
        this.systemService.getMonth(this.year, this.november, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.novemberReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.novemberPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
        });
    }

    getDecember(): void {
        this.systemService.getMonth(this.year, this.december, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.decemberReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.decemberPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
        });
    }
}
