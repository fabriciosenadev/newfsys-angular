import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HeaderService } from 'src/app/services/template/header/header.service';
import { SystemService } from 'src/app/services/system/system.service';
import { LaunchService } from 'src/app/services/user/launch.service';
import { Categories } from 'src/app/models/category.model';
import { LaunchIn } from 'src/app/models/launch/launchIn.model';

@Component({
    selector: 'app-add-launch-in',
    templateUrl: 'add-launch-in.component.html',
    styleUrls: ['./add-launch-in.component.css']
})
export class AddLaunchInComponent implements OnInit {
    token: string = localStorage.getItem('authToken');
    isEnableScheduling: boolean = true;

    categories: Categories = {
        id: 0,
        categories: {},
    };

    launchIn: LaunchIn = {
        date: new Date(),
        id_category: 0,
        description: null,
        value: 0,
        status: 'pending',
        received: false,
        scheduled: false,
        next_month: null,
    }

    launchInForm: FormGroup;

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
        this.launchForm();
    }

    onSubmit() {
        this.launchIn.date = this.launchInForm.value.date;
        this.launchIn.id_category = this.launchInForm.value.idCategory;
        this.launchIn.description = this.launchInForm.value.description;
        this.launchIn.value = this.launchInForm.value.value;

        if (this.launchInForm.value.isReceived) this.launchIn.status = 'received';
        if (this.launchInForm.value.isScheduled && this.isEnableScheduling)
            this.launchIn.next_month = 'scheduled';

        this.newLaunchIn();
        this.resetForm();
    }

    newLaunchIn(): void {
        this.launchService.storeIn(this.launchIn, this.token).subscribe(launchInReturn => {
            this.launchIn = launchInReturn;
            this.launchService.showMessage(launchInReturn.success);

            this.launchIn.date = new Date;
            this.launchIn.description = '';
            this.launchIn.id_category = 0;
            this.launchIn.value = 0;
            this.launchIn.status = 'pending';

            // set all as the beginning
            delete launchInReturn.success;
            launchInReturn = this.launchIn;
        });
    }

    getCategories() {
        this.systemService.getCategories('in', this.token).subscribe(categoriesReturn => {
            this.categories = categoriesReturn;
        });
    }

    launchForm() {
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
            isReceived: new FormControl(
                this.launchIn.received,
                [],
            ),
            isScheduled: new FormControl(
                this.launchIn.scheduled,
                [],
            ),
        });
    }

    resetForm() {
        this.launchInForm.reset();
    }

    EnableScheduling(date: string): void {
        console.log(date);

        const arrMonth = date.split(/-/);
        const launchedMonth = parseInt(arrMonth[1]);
        const currentMonth = new Date().getMonth() + 1;
        const diff = currentMonth - launchedMonth;

        if (diff < 2 && diff >= 0)
            this.isEnableScheduling = true;
        else if (currentMonth === 1 && launchedMonth > 11)
            this.isEnableScheduling = true;
        else if (currentMonth === 2 && launchedMonth >= 1 && launchedMonth < 3)
            this.isEnableScheduling = true;
        else
            this.isEnableScheduling = false;
    }
}
