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
            if (this.januaryPaid <= this.januaryReceived) {
                this.januaryTotal = this.januaryReceived - this.januaryPaid;
            }
            else {
                this.januaryTotal = this.januaryPaid - this.januaryReceived;
            }
        });
    }

    getFebruary(): void {
        this.systemService.getMonth(this.year, this.february, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.februaryReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.februaryPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            if (this.februaryPaid <= this.februaryReceived) {
                this.februaryTotal = this.februaryReceived - this.februaryPaid;
            }
            else {
                this.februaryTotal = this.februaryPaid - this.februaryReceived;
            }
        });
    }

    getMarch(): void {
        this.systemService.getMonth(this.year, this.march, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.marchReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.marchPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            if (this.marchPaid <= this.marchReceived) {
                this.marchTotal = this.marchReceived - this.marchPaid;
            }
            else {
                this.marchTotal = this.marchPaid - this.marchReceived;
            }
        });
    }

    getApril(): void {
        this.systemService.getMonth(this.year, this.april, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.aprilReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.aprilPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            if (this.aprilPaid <= this.aprilReceived) {
                this.aprilTotal = this.aprilReceived - this.aprilPaid;
            }
            else {
                this.aprilTotal = this.aprilPaid - this.aprilReceived;
            }
        });
    }

    getMay(): void {
        this.systemService.getMonth(this.year, this.may, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.mayReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.mayPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            if (this.mayPaid <= this.mayReceived) {
                this.mayTotal = this.mayReceived - this.mayPaid;
            }
            else {
                this.mayTotal = this.mayPaid - this.mayReceived;
            }
        });
    }

    getJune(): void {
        this.systemService.getMonth(this.year, this.june, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.juneReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.junePaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            if (this.junePaid <= this.juneReceived) {
                this.juneTotal = this.juneReceived - this.junePaid;
            }
            else {
                this.juneTotal = this.junePaid - this.juneReceived;
            }

        });
    }

    getJuly(): void {
        this.systemService.getMonth(this.year, this.july, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.julyReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.julyPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            if (this.julyPaid <= this.julyReceived) {
                this.julyTotal = this.julyReceived - this.julyPaid;
            }
            else {
                this.julyTotal = this.julyPaid - this.julyReceived;
            }

        });
    }

    getAugust(): void {
        this.systemService.getMonth(this.year, this.august, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.augustReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.augustPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            if (this.augustPaid <= this.augustReceived) {
                this.augustTotal = this.augustReceived - this.augustPaid;
            }
            else {
                this.augustTotal = this.augustPaid - this.augustReceived;
            }

        });
    }

    getSeptember(): void {
        this.systemService.getMonth(this.year, this.september, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.septemberReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.septemberPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            if (this.septemberPaid <= this.septemberReceived) {
                this.septemberTotal = this.septemberReceived - this.septemberPaid;
            }
            else {
                this.septemberTotal = this.septemberPaid - this.septemberReceived;
            }
        });
    }

    getOctober(): void {
        this.systemService.getMonth(this.year, this.october, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.octoberReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.octoberPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            if (this.octoberPaid <= this.octoberReceived) {
                this.octoberTotal = this.octoberReceived - this.octoberPaid;
            }
            else {
                this.octoberTotal = this.octoberPaid - this.octoberReceived;
            }
        });
    }

    getNovember(): void {
        this.systemService.getMonth(this.year, this.november, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.novemberReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.novemberPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            if (this.novemberPaid <= this.novemberReceived) {
                this.novemberTotal = this.novemberReceived - this.novemberPaid;
            }
            else {
                this.novemberTotal = this.novemberPaid - this.novemberReceived;
            }
        });
    }

    getDecember(): void {
        this.systemService.getMonth(this.year, this.december, this.token).subscribe(monthReturn => {
            this.month = monthReturn;

            this.decemberReceived = this.month.received[0].value == null ? 0 : this.month.received[0].value;
            this.decemberPaid = this.month.paid[0].value == null ? 0 : this.month.paid[0].value;
            if(this.decemberPaid <= this.decemberReceived) {
                this.decemberTotal = this.decemberReceived - this.decemberPaid;
            }
            else {
                this.decemberTotal = this.decemberPaid - this.decemberReceived;
            }
        });
    }

}
