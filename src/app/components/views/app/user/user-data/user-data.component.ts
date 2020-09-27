import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HeaderService } from 'src/app/services/template/header/header.service';
import { UserResetPass } from 'src/app/models/user/userResetPass.model';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { UserInfo } from 'src/app/models/user/userInfo.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-user-data',
    templateUrl: 'user-data.component.html',
    styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

    token: string = localStorage.getItem('authToken');

    userInfo: UserInfo = {
        full_name: '',
        email: '',
        token: ''
    };
    userEmail: string;
    userResetPass: UserResetPass = {
        email: '',
    };

    resetForm: FormGroup;

    get r() { return this.resetForm.controls; }

    constructor(
        private headerService: HeaderService,
        private formBuilder: FormBuilder,
        private userService: UserService,
    ) {
        headerService.headerData = {
            topMenu: 'appMenu',
            sideMenu: 'optionsMenu',
        }
    }

    ngOnInit(): void {
        this.userInfo.token = localStorage.getItem('authToken');

        this.userService.getInfo(this.userInfo).subscribe(userInfoReturn => {
            this.userInfo = userInfoReturn;
        });

        this.formReset();
    }

    onSubmit() {
        this.userResetPass.email = this.userInfo.email;
        this.changePass();
    }

    changePass(): void {
        this.userService.forgot(this.userResetPass).subscribe(userForgotReturn => {
            this.userResetPass = userForgotReturn;

            this.userResetPass.password = this.resetForm.value.password;
            this.userResetPass.verifyPass = this.resetForm.value.verifyPass;
            this.resetPass();
        });
    }

    resetPass(): void {
        this.userResetPass.email = '';
        this.userService.reset(this.userResetPass, this.token).subscribe(userResetReturn => {
            this.userService.showMessage(userResetReturn.success);
            this.resetForm.reset();
        });
    }

    formReset() {
        this.resetForm = this.formBuilder.group({
            password: new FormControl(
                // this.userResetPass.password,
                '',
                [
                    Validators.required,
                    Validators.minLength(8)
                ],
            ),
            verifyPass: new FormControl(
                // this.userResetPass.verifyPass,
                '',
                [
                    Validators.required,
                    Validators.minLength(8)
                ],
            ),
        }, {
            validator: MustMatch('password', 'verifyPass'),
        });
    }

    onSubmit() {
        this.userResetPass.email = this.userInfo.email;
        this.changePass();
        // console.log(this.userResetPass.userId);
        // this.userResetPass.password = this.resetForm.value.password;
        // this.userResetPass.verifyPass = this.resetForm.value.verifyPass;
        // this.resetPass(this.userResetPass.userId.id);
    }

    changePass(): void {
        this.userService.forgot(this.userResetPass).subscribe(userForgotReturn => {
            this.userResetPass = userForgotReturn;

            this.userResetPass.password = this.resetForm.value.password;
            this.userResetPass.verifyPass = this.resetForm.value.verifyPass;
            this.resetPass(this.userResetPass.userId.id);
        });
    }

    resetPass(userId = this.userResetPass.userId.id): void {
        this.userResetPass.id = userId;
        this.userService.reset(this.userResetPass, this.token).subscribe(userResetReturn => {
            this.userService.showMessage(userResetReturn.success);
            this.resetForm.reset();
        });
    }
}
