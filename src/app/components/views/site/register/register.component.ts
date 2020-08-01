import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { MustMatch } from 'src/app/_helpers/must-match.validator';

import { HeaderService } from 'src/app/services/template/header/header.service';
import { UserService } from 'src/app/services/user/user.service';

import { UserRegister } from 'src/app/models/user/userRegister.model';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    user: UserRegister = {
        full_name: '',
        email: '',
        password: '',
        verifyPass: ''
    }
    newUserForm: FormGroup;
    submitted = false;

    // get home input to receive data
    get userEmail(): string {
        return this.userService.userData.email;
    }

    // convenience getter for easy access to form fields
    get f() { return this.newUserForm.controls; }

    constructor(
        private headerService: HeaderService,
        private userService: UserService,
        private router: Router,
        private formBuilder: FormBuilder,
    ) {
        headerService.headerData = {
            topMenu: 'topLink',
        }
    }

    ngOnInit(): void {
        this.user.email = this.userEmail;

        this.newUserForm = this.formBuilder.group({
            fullName: new FormControl(
                this.user.full_name,
                [
                    Validators.required,
                    Validators.minLength(10),
                ]),
            email: new FormControl(
                this.user.email,
                [
                    Validators.required,
                    Validators.email,
                ]),
            password: new FormControl(
                this.user.password,
                [
                    Validators.required,
                    Validators.minLength(8),
                ]),
            verifyPass: new FormControl(
                this.user.verifyPass,
                [
                    Validators.required,
                    Validators.minLength(8),
                ]),
        }, {
            validator: MustMatch('password', 'verifyPass'),
        });
    }

    onSubmit() {
        this.user.full_name = this.newUserForm.value.fullName;
        this.user.email = this.newUserForm.value.email;
        this.user.password = this.newUserForm.value.password;
        this.user.verifyPass = this.newUserForm.value.verifyPass;

        this.newUser();
    }

    newUser(): void {
        this.userService.register(this.user).subscribe(userReturn => {
            this.user = userReturn
            if (userReturn.success) {
                this.userService.showMessage(userReturn.success);
                this.router.navigate(['/login']);
            }
        });
    }

}
