import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../components/models/user.model';
import { ApiService } from "../api/api.service";
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private api: ApiService
    ) { }

    // baseUrl = 'http://localhost:3030/';
    baseUrl = this.api.url;
    route = '';
    userAction = '';

    showMessage(
      msg: string,
      isError: boolean = false
    ): void {
      this.snackBar.open(msg, 'X', {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: isError ? ['msg-error'] : ['msg-success']
      })
    }

    register(user: User): Observable<User>
    {
      this.route = this.api.route.user;
      this.userAction = this.api.userAction.register;

      return this.http.post<User>(
        `${this.baseUrl}/${this.route}/${this.userAction}`, 
        user
      ).pipe( 
        map(obj => obj),
        catchError(error => this.errorHandler(error))
      );
    }
  
  // devolve um Observable vazio com mensagem de erro
  errorHandler(error: any): Observable<any> {
    console.log(error);
    this.showMessage(error, true);
    return EMPTY;
  }
}
