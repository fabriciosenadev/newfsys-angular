import { Component, OnInit } from '@angular/core';

import { PayMethods } from 'src/app/models/payMethod.model';
import { Categories } from 'src/app/models/category.model';
import { LaunchOut } from 'src/app/models/launch/launchOut.model';

import { SystemService } from 'src/app/services/system/system.service';
import { LaunchService } from 'src/app/services/user/launch.service';
import { HeaderService } from 'src/app/services/template/header/header.service';

@Component({
    selector: 'app-launch-out',
    templateUrl: 'launch-out.component.html',
    styleUrls: ['./launch-out.component.css']
})
export class LaunchOutComponent implements OnInit {

    token: string = localStorage.getItem('authToken');
    
    inputValue: string = '';

    categories: Categories = {
        id: 0,
        categories: {},
    }

    payMethods: PayMethods = {
        id: 0,
        payMethods: {},
    }

    launchOut: LaunchOut = {
        date: new Date(),
        id_category: 0,
        description: '',
        value: 0.0,
        id_pay_method: 0,
    }

    constructor(
        private headerService: HeaderService,
        private systemService: SystemService,
        private launchService: LaunchService,
    ) {
        headerService.headerData = {
            routeUrl: 'app'
        }

        this.systemService.getCategories('out', this.token).subscribe(categoriesReturn => {
            this.categories = categoriesReturn;
        });

        this.systemService.getPayMethod(this.token).subscribe(paymethodsReturn => {
            this.payMethods = paymethodsReturn;
        });
    }

    ngOnInit(): void {
    }

    newLaunchOut(): void {
        this.inputValue = this.inputValue.toString().replace(/,/g,'.');
        this.launchOut.value = parseFloat(this.inputValue);

        this.launchService.storeOut(this.launchOut, this.token).subscribe(launchOutReturn => {
            this.inputValue = '';
            this.launchOut = launchOutReturn;
            this.launchService.showMessage(launchOutReturn.success);

            this.launchOut.date = new Date;
            this.launchOut.description = '';
            this.launchOut.id_category = 0;
            this.launchOut.value = 0;
            this.launchOut.id_pay_method = 0;

            // set all as the beginning
            launchOutReturn = this.launchOut;
            delete launchOutReturn.success;
        });
    }

}
