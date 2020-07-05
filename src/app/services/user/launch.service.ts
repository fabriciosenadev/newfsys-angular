import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApiService } from '../api/api.service';
import { SessionService } from '../system/session.service';
import { LaunchOut, LaunchIn, LaunchFilter, LaunchShow } from 'src/app/models/launch.model';

@Injectable({
    providedIn: 'root'
})
export class LaunchService {

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar,
        private api: ApiService,
        private sessionService: SessionService
    ) { }

    baseUrl = this.api.url;
    route = '';
    action = '';

    storeIn(launchIn: LaunchIn, token: string): Observable<LaunchIn> {
        this.route = this.api.route.launch;

        return this.http.post<LaunchOut>(`${this.baseUrl}/${this.route}`,
            launchIn,
            {
                headers: {
                    auth_pass: token
                }
            }
        ).pipe(
            map(obj => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    storeOut(launchOut: LaunchOut, token: string): Observable<LaunchOut> {
        this.route = this.api.route.launch;

        return this.http.post<LaunchOut>(`${this.baseUrl}/${this.route}`, launchOut,
            {
                headers: {
                    auth_pass: token
                }
            }
        ).pipe(
            map(obj => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    filterByDate(launchFilter: LaunchFilter, token: string): Observable<LaunchFilter> {
        this.route = this.api.route.launch;
        this.action = this.api.launchAction.filter;

        return this.http.post<LaunchFilter>(`${this.baseUrl}/${this.route}/${this.action}`
            , launchFilter,
            {
                headers: {
                    auth_pass: token
                },
            },
        ).pipe(
            map(obj => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    filterById(id: Number, token: string): Observable<LaunchShow> {
        this.route = this.api.route.launch;
        return this.http.get<LaunchShow>(`${this.baseUrl}/${this.route}/${id}`,
            {
                headers: {
                    auth_pass: token
                },
            },
        ).pipe(
            map(obj => obj),
            catchError(error => this.errorHandler(error))
        );
    }

    deleteLaunch(id: Number, token: string): Observable<LaunchShow> {
        this.route = this.api.route.launch;
        return this.http.delete<LaunchShow>(`${this.baseUrl}/${this.route}/${id}`,
            {
                headers: {
                    auth_pass: token
                },
            },
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
