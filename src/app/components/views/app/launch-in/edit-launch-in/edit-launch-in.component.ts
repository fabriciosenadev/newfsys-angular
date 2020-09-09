import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/services/template/header/header.service';
import { SystemService } from 'src/app/services/system/system.service';
import { Categories } from 'src/app/models/category.model';
import { LaunchIn } from 'src/app/models/launch/launchIn.model';
import { LaunchService } from 'src/app/services/user/launch.service';

@Component({
    selector: 'app-edit-launch-in',
    templateUrl: 'edit-launch-in.component.html',
    styleUrls: ['./edit-launch-in.component.css']
})
export class EditLaunchInComponent implements OnInit {

    token: string = localStorage.getItem('authToken');

    idLaunchIn: number

    categories: Categories = {
        id: 0,
        categories: {},
    };

    formData = {
        date: new Date(),
        id_category: 0,
        description: null,
        value: 0,
        received: false,
    }

    LaunchIn = {
        date: new Date(),
        id_category: 0,
        description: null,
        value: 0,
        status: 'pending',
        received: false,
    }
    
    editLaunchInForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private currentRoute: ActivatedRoute,
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
        this.idLaunchIn = parseInt(this.currentRoute.snapshot.paramMap.get('id'));

        this.getCategories();
        this.formUpdateLaunchIn();

        this.getLaunch(this.idLaunchIn);
    }

    onSubmit() {
        this.updateLaunchIn();
    }

    formUpdateLaunchIn() {
        this.editLaunchInForm = this.formBuilder.group({
            date: new FormControl(
                this.formData.date,
                [
                    Validators.required,
                ],
            ),
            id_category: new FormControl(
                this.formData.id_category,
                [
                    Validators.required,
                ],
            ),
            description: new FormControl(
                this.formData.description,
            ),
            value: new FormControl(
                this.formData.value,
                [
                    Validators.required,
                    Validators.min(0.01),
                ],
            ),
            received: new FormControl(
                this.formData.received,
                [],
            ),
        });
    }

    getCategories() {
        this.systemService.getCategories('in', this.token).subscribe(categoriesReturn => {
            this.categories = categoriesReturn;
        });
    }

    getLaunch(id: number) {
        this.systemService.getLaunchIn(id, this.token).subscribe(launchReturn => {
            this.formData.date = launchReturn.data.date;
            this.formData.id_category = launchReturn.data.id_category;
            this.formData.description = launchReturn.data.description;
            this.formData.value = launchReturn.data.value;
            this.formData.received = launchReturn.data.status === 'received' ? true : false;
            console.log(this.formData,launchReturn.data);
            
            this.editLaunchInForm.setValue(this.formData);
        });
    }


    updateLaunchIn() {
        this.LaunchIn.date = this.editLaunchInForm.value.date;
        this.LaunchIn.id_category = this.editLaunchInForm.value.id_category;
        this.LaunchIn.description = this.editLaunchInForm.value.description;
        this.LaunchIn.value = this.editLaunchInForm.value.value;
        this.LaunchIn.status = this.editLaunchInForm.value.received === true ? 'received' : 'pending';
        
        this.launchService.updateIn(
            this.LaunchIn,
            this.idLaunchIn,
            this.token
        ).subscribe(launchReturn => {
            if (launchReturn.success) {
                this.launchService.showMessage(launchReturn.success);
                this.router.navigate([`/app/launch/${this.idLaunchIn}`]);
            }
        });
    }
}
