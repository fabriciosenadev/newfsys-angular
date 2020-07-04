import { Component, OnInit } from '@angular/core';
import { LaunchFilter } from 'src/app/models/launch.model';
import { LaunchService } from 'src/app/services/user/launch.service';
import { HeaderService } from 'src/app/services/template/header/header.service';

@Component({
    selector: 'app-launch-filter',
    templateUrl: 'launch-filter.component.html',
    styleUrls: ['./launch-filter.component.css']
})
export class LaunchFilterComponent implements OnInit {

    token: string = localStorage.getItem('authToken');

    launches: [];
    length: number = 0;

    launchFilter: LaunchFilter = {
        fromDate: new Date(),
        toDate: new Date(),
    }

    constructor(
        private launchService: LaunchService,
        private headerService: HeaderService
    ) {
        headerService.headerData = {
            routeUrl: 'app'
        }
    }

    ngOnInit(): void {
    }

    filter(): void {
        this.launchService.filterByDate(this.launchFilter, this.token).subscribe(filterReturn => {
            this.launchFilter = filterReturn;
            console.log(filterReturn.data);
            this.length = this.launchFilter.data.length;
            console.log(this.length);
        });
    }

}
