import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

import { HeaderService } from 'src/app/services/template/header/header.service';
import { SessionService } from 'src/app/services/system/session.service';

import { UserLogin } from 'src/app/models/user/userLogin.model';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: UserLogin = {
        email: '',
        password: ''
    }

    loginForm: FormGroup;

    get lf() {return this.loginForm.controls; }

    constructor(
        private headerService: HeaderService,
        private sessionService: SessionService,
        private router: Router,
        private formBuilder: FormBuilder,
    ) {
        headerService.headerData = {
            topMenu: 'topLink',
        }
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: new FormControl(
                this.user.email,
                [
                    Validators.email
                ]
            ),
            password: new FormControl(
                this.user.password,
                [
                    Validators.minLength(8)
                ]
            ),
        });
    }

    onSubmit()
    {
        this.user.email = this.loginForm.value.email;
        this.user.password = this.loginForm.value.password;

        this.login();
    }

    login(): void {
        this.sessionService.login(this.user).subscribe(loginReturn => {
            this.user = loginReturn
            if (loginReturn.token) {
                localStorage.setItem('authToken', loginReturn.token);
                this.sessionService.showMessage('Logado com sucesso');
                this.router.navigate(['/app/profile']);
            }
        });
    }

}
