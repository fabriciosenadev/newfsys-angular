import { Component, OnInit } from '@angular/core';
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

    januaryReceived: Number = 0;
    januaryPaid: Number = 0;
    januaryTotal: Number = 0;

    februaryReceived: Number = 0;
    februaryPaid: Number = 0;
    februaryTotal: Number = 0;

    marchReceived: Number = 0;
    marchPaid: Number = 0;
    marchTotal: Number = 0;

    aprilReceived: Number = 0;
    aprilPaid: Number = 0;
    aprilTotal: Number = 0;

    mayReceived: Number = 0;
    mayPaid: Number = 0;
    mayTotal: Number = 0;

    juneReceived: Number = 0;
    junePaid: Number = 0;
    juneTotal: Number = 0;

    julyReceived: Number = 0;
    julyPaid: Number = 0;
    julyTotal: Number = 0;

    augustReceived: Number = 0;
    augustPaid: Number = 0;
    augustTotal: Number = 0;

    septemberReceived: Number = 0;
    septemberPaid: Number = 0;
    septemberTotal: Number = 0;

    octoberReceived: Number = 0;
    octoberPaid: Number = 0;
    octoberTotal: Number = 0;

    novemberReceived: Number = 0;
    novemberPaid: Number = 0;
    novemberTotal: Number = 0;

    decemberReceived: Number = 0;
    decemberPaid: Number = 0;
    decemberTotal: Number = 0;


    constructor(
        private sessionService: SessionService,
        private headerService: HeaderService,
        private systemService: SystemService,
    ) {
        if (!this.token) this.sessionService.forceLogin();

        headerService.headerData = {
            routeUrl: 'app'
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
            this.januaryTotal = this.month.total[0].value == null ? 0 : this.month.total[0].value;
        });
    }

    getFebruary(): void {
        this.systemService.getMonth(this.year, this.february, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.februaryReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.februaryPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            this.februaryTotal = this.month.total[0].value == null ? 0 : this.month.total[0].value;
        });
    }

    getMarch(): void {
        this.systemService.getMonth(this.year, this.march, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.marchReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.marchPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            this.marchTotal = this.month.total[0].value == null ? 0 : this.month.total[0].value;
        });
    }

    getApril(): void {
        this.systemService.getMonth(this.year, this.april, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.aprilReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.aprilPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            this.aprilTotal = this.month.total[0].value == null ? 0 : this.month.total[0].value;
        });
    }

    getMay(): void {
        this.systemService.getMonth(this.year, this.may, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.mayReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.mayPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            this.mayTotal = this.month.total[0].value == null ? 0 : this.month.total[0].value;
        });
    }

    getJune(): void {
        this.systemService.getMonth(this.year, this.june, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.juneReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.junePaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            this.juneTotal = this.month.total[0].value == null ? 0 : this.month.total[0].value;
        });
    }

    getJuly(): void {
        this.systemService.getMonth(this.year, this.july, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.julyReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.julyPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            this.julyTotal = this.month.total[0].value == null ? 0 : this.month.total[0].value;
        });
    }

    getAugust(): void {
        this.systemService.getMonth(this.year, this.august, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.augustReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.augustPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            this.augustTotal = this.month.total[0].value == null ? 0 : this.month.total[0].value;
        });
    }

    getSeptember(): void {
        this.systemService.getMonth(this.year, this.september, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.septemberReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.septemberPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            this.septemberTotal = this.month.total[0].value == null ? 0 : this.month.total[0].value;
        });
    }

    getOctober(): void {
        this.systemService.getMonth(this.year, this.october, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.octoberReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.octoberPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            this.octoberTotal = this.month.total[0].value == null ? 0 : this.month.total[0].value;
        });
    }

    getNovember(): void {
        this.systemService.getMonth(this.year, this.november, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.novemberReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.novemberPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            this.novemberTotal = this.month.total[0].value == null ? 0 : this.month.total[0].value;
        });
    }

    getDecember(): void {
        this.systemService.getMonth(this.year, this.december, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.decemberReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.decemberPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            this.decemberTotal = this.month.total[0].value == null ? 0 : this.month.total[0].value;
        });
    }

}
