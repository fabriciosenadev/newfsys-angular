import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { HeaderService } from 'src/app/services/template/header/header.service';
import { UserService } from 'src/app/services/user/user.service';

import { UserResetPass } from 'src/app/models/user/userResetPass.model';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
    selector: 'app-forgot',
    templateUrl: 'forgot.component.html',
    styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

    token: string;

    isEnableReset = false;

    userResetPass: UserResetPass = {
        email: '',
        password: '',
        verifyPass: '',
    }

    forgotForm: FormGroup;
    resetForm: FormGroup;

    get f() { return this.forgotForm.controls; }
    get r() { return this.resetForm.controls; }

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
        this.formForgot();
        this.formReset();
    }

    onSubmit() {
        if(!this.isEnableReset)
        {
            this.userResetPass.email = this.forgotForm.value.email;
            this.forgotPass();
        }
        else
        {
            this.userResetPass.password = this.resetForm.value.password;
            this.userResetPass.verifyPass = this.resetForm.value.verifyPass;
            this.resetPass(this.token);
        }
    }

    forgotPass(): void {
        this.userService.forgot(this.userResetPass).subscribe(userForgotReturn => {
            this.token = userForgotReturn.token;
            this.isEnableReset = userForgotReturn.isEnableReset;            
            this.userService.showMessage(userForgotReturn.success);

        });
    }

    resetPass (token: string) {
        this.userResetPass.email = '';
        this.userService.reset(this.userResetPass, token).subscribe(userResetReturn => {           
            this.userService.showMessage(userResetReturn.success);
            this.router.navigate(['/login']);
        });    
    }

    formForgot() {
        this.forgotForm = this.formBuilder.group({
            email: new FormControl(
                this.userResetPass.email,
                [
                    Validators.email
                ],
            )
        });
    }

    formReset() {
        this.resetForm = this.formBuilder.group({
            password: new FormControl(
                this.userResetPass.password,
                [
                    Validators.required,
                    Validators.minLength(8)
                ],
            ),
            verifyPass: new FormControl(
                this.userResetPass.verifyPass,
                [
                    Validators.required,
                    Validators.minLength(8)
                ],
            ),
        },{
            validator: MustMatch('password','verifyPass'),
        });
    }
}
