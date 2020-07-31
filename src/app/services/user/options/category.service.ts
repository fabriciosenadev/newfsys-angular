import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import { ApiService } from '../../api/api.service';
import { SessionService } from '../../system/session.service';
import { Categories } from 'src/app/models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar,
        private api: ApiService,
        private sessionService: SessionService,
    ) { }

    baseUrl = this.api.url;
    route = '';
    action = '';

    deleteCategory(id: Number, token: string): Observable<Categories> {
        this.route = this.api.route.category;
        return this.http.delete<Categories>(`${this.baseUrl}/${this.route}/${id}`,
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

    newCategory(
        category: string,
        applicable: string,
        token: string,
    ): Observable<Categories> {
        this.route = this.api.route.category;
        this.action = this.api.categoryAction.new;
        let newCategory = {
            category,
            applicable
        }

        return this.http.post<Categories>(
            `${this.baseUrl}/${this.route}/${this.action}`,
            newCategory,
            {
                headers: {
                    auth_pass: token
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
        else if (errorRes.error.error) {
            showMsg = errorRes.error.error;
            this.showMessage(showMsg, true);
        }

        return EMPTY;
    }
}
