import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/models/user.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SessionService } from './session.service';
import { ApiService } from '../api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Categories } from 'src/app/models/category.model';
import { PayMethods } from 'src/app/models/payMethod.model';

@Injectable({
    providedIn: 'root'
})
export class SystemService {

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar,
        private sessionService: SessionService,
        private api: ApiService,
    ) { }

    baseUrl = this.api.url;
    route = '';
    action = '';
    systemRoute = '';

    getUserInfo(userInfo: UserInfo): Observable<UserInfo> {
        this.route = this.api.route.system;
        this.systemRoute = this.api.systemRoute.user;
        this.action = this.api.systemAction.userInfo;

        return this.http.get<UserInfo>(
            `${this.baseUrl}/${this.route}/${this.systemRoute}/${this.action}`,
            {
                headers: {
                    auth_pass: userInfo.token
                }
            }
        ).pipe(
            map(obj => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    getCategories(
        categoryType: string = '',
        token: string
    ): Observable<Categories> {
        this.route = this.api.route.system;
        this.systemRoute = this.api.systemRoute.categories;
        this.action = categoryType;

        return this.http.get<Categories>(
            `${this.baseUrl}/${this.route}/${this.systemRoute}/${this.action}`,
            {
                headers: {
                    auth_pass: token,
                },
            }
        ).pipe(
            map(obj => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    getPayMethod(token: string): Observable<PayMethods> {
        this.route = this.api.route.system;
        this.systemRoute = this.api.systemRoute.payMethod;

        return this.http.get<PayMethods>(
            `${this.baseUrl}/${this.route}/${this.systemRoute}`,
            {
                headers: {
                    auth_pass: token,
                },
            }
        ).pipe(
            map(obj => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    showMessage(
        msg: string,
        isError: boolean = false
    ): void {
        this.snackBar.open(msg, 'X', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ['msg-error'] : ['msg-success']
        });
    }

    // devolve um Observable vazio com mensagem de erro
    errorHandler(errorRes: any): Observable<any> {
        console.log(errorRes);

        if (errorRes.error.auth === false) this.sessionService.forceLogin();

        let showMsg = '';
        let param = '';

        if (errorRes.error.data) {
            showMsg = errorRes.error.data[0].msg;
            param = errorRes.error.data[0].param;
            this.showMessage(param + ' ' + showMsg, true);
        }
        else if (errorRes.error.msg) {
            showMsg = errorRes.error.msg;
            this.showMessage(showMsg, true);
        }

        return EMPTY;
    }
}
