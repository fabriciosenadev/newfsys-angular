import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HeaderService } from 'src/app/services/template/header/header.service';
import { SystemService } from 'src/app/services/system/system.service';
import { LaunchService } from 'src/app/services/user/launch.service';
import { Categories } from 'src/app/models/category.model';
import { PayMethods } from 'src/app/models/payMethod.model';
import { LaunchOut } from 'src/app/models/launch/launchOut.model';

@Component({
    selector: 'app-add-launch-out',
    templateUrl: 'add-launch-out.component.html',
    styleUrls: ['./add-launch-out.component.css']
})
export class AddLaunchOutComponent implements OnInit {

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
        description: null,
        value: 0.0,
        id_pay_method: 0,
        status: 'pending',
        paid: false
    }

    launchOutForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private headerService: HeaderService,
        private systemService: SystemService,
        private launchService: LaunchService,
    ) {
        headerService.headerData = {
            topMenu: 'appMenu',
            sideMenu: 'launchMenu',
        }
    }

    ngOnInit(): void {
        this.getCategories();
        this.getPayMethod();
        this.launchForm();
    }

    onSubmit() {
        this.launchOut.date = this.launchOutForm.value.date;
        this.launchOut.id_category = this.launchOutForm.value.idCategory;
        this.launchOut.description = this.launchOutForm.value.description;
        this.launchOut.value = this.launchOutForm.value.value;
        this.launchOut.id_pay_method = this.launchOutForm.value.idPayMethod;

        if (this.launchOutForm.value.isPaid) this.launchOut.status = 'paid';

        this.newLaunchOut();

        this.resetForm();
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
            this.launchOut.status = 'pending';

            // set all as the beginning
            launchOutReturn = this.launchOut;
            delete launchOutReturn.success;
        });
    }

    getCategories() {
        this.systemService.getCategories('out', this.token).subscribe(categoriesReturn => {
            this.categories = categoriesReturn;
        });
    }

    getPayMethod() {
        this.systemService.getPayMethod(this.token).subscribe(paymethodsReturn => {
            this.payMethods = paymethodsReturn;
        });
    }

    launchForm() {
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
            isPaid: new FormControl(
                this.launchOut.paid,
                []
            ),
        });
    }

    resetForm() {
        this.launchOutForm.reset();
    }

}
