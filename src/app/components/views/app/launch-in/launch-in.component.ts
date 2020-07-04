import { Component, OnInit } from '@angular/core';

import { Categories } from 'src/app/models/category.model';
import { LaunchIn } from 'src/app/models/launch.model';

import { SystemService } from 'src/app/services/system/system.service';
import { LaunchService } from 'src/app/services/user/launch.service';
import { HeaderService } from 'src/app/services/template/header/header.service';


@Component({
    selector: 'app-launch-in',
    templateUrl: 'launch-in.component.html',
    styleUrls: ['./launch-in.component.css']
})
export class LaunchInComponent implements OnInit {

    token: string = localStorage.getItem('authToken');

    categories: Categories = {
        id: 0,
        categories: {},
    };

    launchIn: LaunchIn = {
        date: new Date(),
        id_category: 0,
        description: '',
        value: 0
    }

    constructor(
        private headerService: HeaderService,
        private systemService: SystemService,
        private launchService: LaunchService
    ) {
        headerService.headerData = {
            routeUrl: 'app'
        }

        this.systemService.getCategories('in', this.token).subscribe(categoriesReturn => {
            this.categories = categoriesReturn;
        });
    }

    ngOnInit(): void {
    }

    newLaunchIn(): void {
        this.launchService.storeIn(this.launchIn, this.token).subscribe(launchInReturn => {
            this.launchIn = launchInReturn;
            this.launchService.showMessage(launchInReturn.success);
        });
    }

}
