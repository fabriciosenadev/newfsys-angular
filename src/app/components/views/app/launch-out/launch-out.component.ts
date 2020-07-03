import { Component, OnInit } from '@angular/core';

import { PayMethods } from 'src/app/models/payMethod.model';
import { Categories } from 'src/app/models/category.model';

import { SystemService } from 'src/app/services/system/system.service';
import { LaunchOut } from 'src/app/models/launch.model';
import { LaunchService } from 'src/app/services/user/launch.service';

@Component({
    selector: 'app-launch-out',
    templateUrl: 'launch-out.component.html',
    styleUrls: ['./launch-out.component.css']
})
export class LaunchOutComponent implements OnInit {

    token: string = localStorage.getItem('authToken');

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
        value: 0,
        id_pay_method: 0,
    }

    constructor(
        private systemService: SystemService,
        private launchService: LaunchService,
    ) {
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
        console.log(this.launchOut);
        this.launchService.storeOut(this.launchOut, this.token).subscribe(launchOutReturn => {
            this.launchOut = launchOutReturn;
            console.log(launchOutReturn);
            this.launchService.showMessage(launchOutReturn.success);
        });
    }

}
