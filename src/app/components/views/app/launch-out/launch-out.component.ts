import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { SystemService } from 'src/app/services/system/system.service';
import { LaunchService } from 'src/app/services/user/launch.service';
import { HeaderService } from 'src/app/services/template/header/header.service';

import { PayMethods } from 'src/app/models/payMethod.model';
import { Categories } from 'src/app/models/category.model';
import { LaunchOut } from 'src/app/models/launch/launchOut.model';

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

    launchOutForm: FormGroup;

    get f() { return this.launchOutForm.controls; }

    constructor(
        private headerService: HeaderService,
        private systemService: SystemService,
        private launchService: LaunchService,
        private formBuilder: FormBuilder,
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
        this.launchOutForm = this.formBuilder.group({
            date: new FormControl(
                this.launchOut.date,
                [
                    Validators.required,
                ],
            ),
            idCategory: new FormControl(
                this.launchOut.id_category,
                [
                    Validators.required,
                ],
            ),
            description: new FormControl(
                this.launchOut.description,
            ),
            value: new FormControl(
                this.launchOut.value,
                [
                    Validators.required,
                    Validators.min(0.01),
                ],
            ),
            idPayMethod: new FormControl(
                this.launchOut.id_pay_method,
                [
                    Validators.required,
                ],
            ),
        });
    }

    onSubmit() {
        this.launchOut.date = this.launchOutForm.value.date;
        this.launchOut.id_category = this.launchOutForm.value.idCategory;
        this.launchOut.description = this.launchOutForm.value.description;
        this.launchOut.value = this.launchOutForm.value.value;
        this.launchOut.id_pay_method = this.launchOutForm.value.idPayMethod;

        this.newLaunchOut();

        this.launchOutForm.reset();
    }

    newLaunchOut(): void {
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
