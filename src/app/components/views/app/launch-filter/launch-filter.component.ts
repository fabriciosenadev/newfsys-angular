import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { LaunchFilter } from 'src/app/models/launch/launchFilter.model';
import { Categories } from 'src/app/models/category.model';
import { PayMethods } from 'src/app/models/payMethod.model';

import { LaunchService } from 'src/app/services/user/launch.service';
import { HeaderService } from 'src/app/services/template/header/header.service';
import { SystemService } from 'src/app/services/system/system.service';

@Component({
    selector: 'app-launch-filter',
    templateUrl: 'launch-filter.component.html',
    styleUrls: ['./launch-filter.component.css']
})
export class LaunchFilterComponent implements OnInit {

    token: string = localStorage.getItem('authToken');

    launches: [];
    length: number = -1;

    launchFilter: LaunchFilter = {
        fromDate: new Date(),
        toDate: new Date(),
        in: true,
        out: true,
        id_category: 0,
        id_pay_method: 0,
    }

    categories: Categories = {
        id: 0,
        categories: {},
    };

    payMethods: PayMethods = {
        id: 0,
        payMethods: {},
    }


    filterForm: FormGroup;

    get f() { return this.filterForm.controls; }

    constructor(
        private launchService: LaunchService,
        private headerService: HeaderService,
        private systemService: SystemService,
        private formBuilder: FormBuilder,
    ) {
        headerService.headerData = {
            topMenu: 'appMenu',
            sideMenu: 'launchMenu',
        }
    }

    ngOnInit(): void {
        this.filterForm = this.formBuilder.group({
            fromDate: new FormControl(
                this.launchFilter.fromDate, [],
            ),
            toDate: new FormControl(
                this.launchFilter.toDate, [],
            ),
            received: new FormControl(
                this.launchFilter.in, [],
            ),
            paid: new FormControl(
                this.launchFilter.out, [],
            ),
            idCategory: new FormControl(
                this.launchFilter.id_category, [],
            ),
            idPayMethod: new FormControl(
                { value: this.launchFilter.id_pay_method, disabled: false }, [],
            ),
        });

        if (this.f.received.value) {
            this.loadCategories('');
        }

        if (this.f.paid.value) {
            this.loadPayMethod();
        }
    }

    onSubmit() {
        console.log(this.filterForm.controls);
        this.launchFilter.fromDate = this.f.fromDate.value;
        this.launchFilter.toDate = this.f.toDate.value;
        this.launchFilter.in = this.f.received.value;
        this.launchFilter.out = this.f.paid.value;
        this.launchFilter.id_category = this.f.idCategory.value;

        if (this.f.received.value)
            this.launchFilter.id_pay_method = this.f.idPayMethod.value;
        else
            this.launchFilter.id_pay_method = 0;

        this.filter();
    }

    filter(): void {
        this.launchService.filterByDate(this.launchFilter, this.token).subscribe(filterReturn => {
            this.launchFilter = filterReturn;
            this.length = this.launchFilter.data.length;
        });
    }

    loadCategories(type: string) {
        this.systemService.getCategories(type, this.token).subscribe(categoriesReturn => {
            this.categories = categoriesReturn;
        });
    }

    loadPayMethod() {
        this.systemService.getPayMethod(this.token).subscribe(paymethodsReturn => {
            this.payMethods = paymethodsReturn;
        });
    }

    reloadCategories() {
        // console.log(this.filterForm.controls);
        console.log(this.f.received.value, this.f.paid.value);

        let received = this.f.received.value;
        let paid = this.f.paid.value;
        let reload = '';
        if (received && paid) {
            this.loadCategories('inout');
        }
        else if (received && !paid) {
            this.loadCategories('in');
        }
        else if (!received && paid) {
            this.loadCategories('out');
        }
        else if (!received && !paid) {
            this.launchService.showMessage('Selecione pelo menos uma das chaves para recebido ou pago!', true);
        }
    }
}
