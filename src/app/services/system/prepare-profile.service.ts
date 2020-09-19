import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root'
})
export class PrepareProfileService {

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

    hasScheduling(token: string): Observable<any> {
        this.route = this.api.route.system;
        this.systemRoute = this.api.systemRoute.checkScheduling;

        return this.http.get<any>(
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

    createLaunchingScheduled(token: string): Observable<any> {
        this.route = this.api.route.system;
        this.systemRoute = this.api.systemRoute.createLaunchScheduled;
        
        return this.http.get<any>(
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
