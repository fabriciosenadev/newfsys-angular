import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HeaderService } from 'src/app/services/template/header/header.service';
import { UserResetPass } from 'src/app/models/user/userResetPass.model';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { UserInfo } from 'src/app/models/user/userInfo.model';
import { UserService } from 'src/app/services/user/user.service';
import { UserChangePass } from 'src/app/models/user/userChangePass.model';

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

    userChangePass: UserChangePass ;

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
        this.userChangePass = this.resetForm.value;
        
        this.changePass();
        this.resetForm.reset();
    }

    changePass() {
        this.userService.changePassword(this.userChangePass, this.token).subscribe(changeReturn => {
            this.userService.showMessage(changeReturn.success);
        });
    }

    formReset() {
        this.resetForm = this.formBuilder.group({
            oldPass: new FormControl(
                // this.userResetPass.password,
                '',
                [
                    Validators.required,
                    Validators.minLength(8)
                ],
            ),
            newPass: new FormControl(
                // this.userResetPass.password,
                '',
                [
                    Validators.required,
                    Validators.minLength(8)
                ],
            ),
            verifyNewPass: new FormControl(
                // this.userResetPass.verifyPass,
                '',
                [
                    Validators.required,
                    Validators.minLength(8)
                ],
            ),
        }, {
            validator: MustMatch('newPass', 'verifyNewPass'),
        });
    }
}
