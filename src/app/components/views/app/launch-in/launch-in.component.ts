import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { SystemService } from 'src/app/services/system/system.service';
import { LaunchService } from 'src/app/services/user/launch.service';
import { HeaderService } from 'src/app/services/template/header/header.service';

import { Categories } from 'src/app/models/category.model';
import { LaunchIn } from 'src/app/models/launch/launchIn.model';

@Component({
    selector: 'app-launch-in',
    templateUrl: 'launch-in.component.html',
    styleUrls: ['./launch-in.component.css']
})
export class LaunchInComponent implements OnInit {

    token: string = localStorage.getItem('authToken');

    inputValue: string = '';

    categories: Categories = {
        id: 0,
        categories: {},
    };

    launchIn: LaunchIn = {
        date: new Date(),
        id_category: 0,
        description: null,
        value: 0
    }

    launchInForm: FormGroup;

    get f() { return this.launchInForm.controls; }

    constructor(
        private headerService: HeaderService,
        private systemService: SystemService,
        private launchService: LaunchService,
        private formBuilder: FormBuilder,
    ) {
        headerService.headerData = {
            topMenu: 'appMenu',
            sideMenu: 'launchMenu',
        }

        this.systemService.getCategories('in', this.token).subscribe(categoriesReturn => {
            this.categories = categoriesReturn;
        });
    }

    ngOnInit(): void {
        this.launchInForm = this.formBuilder.group({
            date: new FormControl(
                this.launchIn.date,
                [
                    Validators.required,
                ],
            ),
            idCategory: new FormControl(
                this.launchIn.id_category,
                [
                    Validators.required,
                ],
            ),
            description: new FormControl(
                this.launchIn.description,
            ),
            value: new FormControl(
                this.launchIn.value,
                [
                    Validators.required,
                    Validators.min(0.01),
                ],
            ),
        });
    }

    onSubmit() {
        this.launchIn.date = this.launchInForm.value.date;
        this.launchIn.id_category = this.launchInForm.value.idCategory;
        this.launchIn.description = this.launchInForm.value.description;
        this.launchIn.value = this.launchInForm.value.value;

        this.newLaunchIn();

        this.launchInForm.reset();
    }

    newLaunchIn(): void {
        this.launchService.storeIn(this.launchIn, this.token).subscribe(launchInReturn => {
            this.inputValue = '';
            this.launchIn = launchInReturn;
            this.launchService.showMessage(launchInReturn.success);

            this.launchIn.date = new Date;
            this.launchIn.description = '';
            this.launchIn.id_category = 0;
            this.launchIn.value = 0;

            // set all as the beginning
            delete launchInReturn.success;
            launchInReturn = this.launchIn;
        });
    }

}
