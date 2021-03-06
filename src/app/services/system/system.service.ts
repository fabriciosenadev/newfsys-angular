import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { SessionService } from './session.service';
import { ApiService } from '../api/api.service';

import { UserInfo } from '../../models/user/userInfo.model';
import { Categories } from 'src/app/models/category.model';
import { PayMethods } from 'src/app/models/payMethod.model';
import { Month } from 'src/app/models/month.model';
import { LaunchIn } from 'src/app/models/launch/launchIn.model';
import { LaunchOut } from 'src/app/models/launch/launchOut.model';

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

        return this.http.get<Categories>(
            `${this.baseUrl}/${this.route}/${this.systemRoute}`,
            {
                headers: {
                    auth_pass: token,
                },
                params: {
                    applicable: categoryType
                }
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

    getMonth(year: string, month: string, token: string): Observable<Month> {
        this.route = this.api.route.system;
        this.systemRoute = this.api.systemRoute.userProfile;

        return this.http.get<Month>(
            `${this.baseUrl}/${this.route}/${this.systemRoute}`,
            {
                headers: {
                    auth_pass: token,
                },
                params: {
                    month,
                    year,
                }
            }
        ).pipe(
            map(obj => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    pieChart(year: string, month: string, token: string): Observable<Month> {
        this.route = this.api.route.system;
        this.systemRoute = this.api.systemRoute.pieChart;

        return this.http.get<Month>(
            `${this.baseUrl}/${this.route}/${this.systemRoute}`,
            {
                headers: {
                    auth_pass: token,
                },
                params: {
                    month,
                    year
                }
            }
        ).pipe(
            map(obj => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    getDetailByMoth(year: string, month: string, token: string): Observable<Month> {
        this.route = this.api.route.system;
        this.systemRoute = this.api.systemRoute.detailsByCategory;

        return this.http.get<Month>(
            `${this.baseUrl}/${this.route}/${this.systemRoute}`,
            {
                headers: {
                    auth_pass: token,
                },
                params: {
                    month,
                    year,
                }
            }
        ).pipe(
            map(obj => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    getLaunchIn(id: number, token: string): Observable<LaunchIn> {
        this.route = this.api.route.system;
        this.systemRoute = this.api.systemRoute.launch;

        return this.http.get<LaunchIn>(
            `${this.baseUrl}/${this.route}/${this.systemRoute}/${id}`,
            {
                headers: {
                    auth_pass: token,
                }
            }
        ).pipe(
            map(obj => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    getLaunchOut(id: number, token: string): Observable<LaunchOut> {
        this.route = this.api.route.system;
        this.systemRoute = this.api.systemRoute.launch;

        return this.http.get<LaunchOut>(
            `${this.baseUrl}/${this.route}/${this.systemRoute}/${id}`,
            {
                headers: {
                    auth_pass: token,
                }
            }
        ).pipe(
            map(obj => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    getAmountAvailable(token: string): Observable<any> {
        this.route = this.api.route.system;
        this.systemRoute = this.api.systemRoute.amountAvailable;

        return this.http.get<any>(
            `${this.baseUrl}/${this.route}/${this.systemRoute}`,
            {
                headers: {
                    auth_pass: token,
                }
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
