import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/services/template/header/header.service';
import { SystemService } from 'src/app/services/system/system.service';
import { LaunchService } from 'src/app/services/user/launch.service';
import { Categories } from 'src/app/models/category.model';
import { PayMethods } from 'src/app/models/payMethod.model';
import { LaunchOut } from 'src/app/models/launch/launchOut.model';

@Component({
    selector: 'app-edit-launch-out',
    templateUrl: 'edit-launch-out.component.html',
    styleUrls: ['./edit-launch-out.component.css']
})
export class EditLaunchOutComponent implements OnInit {

    token: string = localStorage.getItem('authToken');

    idLaunchOut: number

    categories: Categories = {
        id: 0,
        categories: {},
    }

    payMethods: PayMethods = {
        id: 0,
        payMethods: {},
    }

    formData = {
        date: new Date(),
        id_category: 0,
        description: null,
        value: 0.0,
        id_pay_method: 0,
        paid: false
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

    editLaunchOutForm: FormGroup;

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
        this.idLaunchOut = parseInt(this.currentRoute.snapshot.paramMap.get('id'));
        this.getCategories();
        this.getPayMethod();
        this.formUpdateLaunchOut();

        this.getLaunch(this.idLaunchOut);
    }

    onSubmit() {
        this.updateLaunchIn();
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

    formUpdateLaunchOut() {
        this.editLaunchOutForm = this.formBuilder.group({
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
            id_pay_method: new FormControl(
                this.formData.id_pay_method,
                [
                    Validators.required,
                ],
            ),
            paid: new FormControl(
                this.formData.paid,
                []
            ),
        });
    }

    getLaunch(id: number){
        this.systemService.getLaunchOut(id, this.token).subscribe(launchReturn => {
            this.formData.date = launchReturn.data.date;
            this.formData.id_category = launchReturn.data.id_category;
            this.formData.description = launchReturn.data.description;
            this.formData.value = launchReturn.data.value;
            this.formData.id_pay_method = launchReturn.data.id_pay_method;
            this.formData.paid = launchReturn.data.status === 'paid' ? true : false;
            
            this.editLaunchOutForm.setValue(this.formData);
        });
    }

    updateLaunchIn() {
        this.launchOut.date = this.editLaunchOutForm.value.date;
        this.launchOut.id_category = this.editLaunchOutForm.value.id_category;
        this.launchOut.description = this.editLaunchOutForm.value.description;
        this.launchOut.value = this.editLaunchOutForm.value.value;
        this.launchOut.id_pay_method = this.editLaunchOutForm.value.id_pay_method;
        this.launchOut.status = this.editLaunchOutForm.value.paid === true ? 'paid' : 'pending';
        
        this.launchService.updateOut(
            this.launchOut,
            this.idLaunchOut,
            this.token
        ).subscribe(launchReturn => {
            if (launchReturn.success) {
                this.launchService.showMessage(launchReturn.success);
                this.router.navigate([`/app/launch/${this.idLaunchOut}`]);
            }
        });
    }

}