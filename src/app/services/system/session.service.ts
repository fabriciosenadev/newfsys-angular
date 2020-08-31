import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApiService } from '../api/api.service';
import { UserLogin } from '../../models/user/userLogin.model';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    constructor(
        private http: HttpClient,
        private api: ApiService,
        private snackBar: MatSnackBar,
        private router: Router
    ) { }

    baseUrl = this.api.url;
    route = '';
    userAction = '';

    login(user: UserLogin): Observable<UserLogin> {
        this.route = this.api.route.user;
        this.userAction = this.api.userAction.login;

        return this.http.post<UserLogin>(
            `${this.baseUrl}/${this.route}/${this.userAction}`,
            user
        ).pipe(
            map(obj => obj),
            catchError(error => this.errorHandler(error)
            ));
    }

    forceLogin(): void {
        this.showMessage('Por favor faça login!', true);
        this.router.navigate(['/login']);
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
        this.showMessage(errorRes.error.data[0].msg, true);
        return EMPTY;
    }
}
