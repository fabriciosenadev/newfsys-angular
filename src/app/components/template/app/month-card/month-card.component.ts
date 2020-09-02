import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/services/system/system.service';
import { Month } from 'src/app/models/month.model';

@Component({
    selector: 'app-month-card',
    templateUrl: 'month-card.component.html',
    styleUrls: ['./month-card.component.css']
})
export class MonthCardComponent implements OnInit {

    @Input() monthId = '';
    @Input() monthReceived;
    @Input() monthPaid;
    @Input() selectedYear = '';

    monthTotal;
    monthName = '';
    month: Month;

    token = localStorage.getItem('authToken');

    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.selectMonthName();
    }

    showResume() {
        this.router.navigate([`/app/details/${this.selectedYear}/${this.monthId}`])
    }

    selectMonthName(): void {
        switch (this.monthId) {
            case '01':
                this.monthName = 'Janeiro';
                break;
            case '02':
                this.monthName = 'Fevereiro';
                break;
            case '03':
                this.monthName = 'Março';
                break;
            case '04':
                this.monthName = 'Abril';
                break;
            case '05':
                this.monthName = 'Maio';
                break;
            case '06':
                this.monthName = 'Junho';
                break;
            case '07':
                this.monthName = 'Julho';
                break;
            case '08':
                this.monthName = 'Agosto';
                break;
            case '09':
                this.monthName = 'Setembro';
                break;
            case '10':
                this.monthName = 'Outubro';
                break;
            case '11':
                this.monthName = 'Novembro';
                break;
            case '12':
                this.monthName = 'Dezembro';
                break;
        }
    }
}
