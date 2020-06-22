import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiService } from "../api/api.service";
import { UserRegister, UserResetPass } from '../../components/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private snackBar: MatSnackBar
    ) { }

    baseUrl = this.api.url;
    route = '';
    userAction = '';

    register(userRegister: UserRegister): Observable<UserRegister>
    {
      this.route = this.api.route.user;
      this.userAction = this.api.userAction.register;

      return this.http.post<UserRegister>(
        `${this.baseUrl}/${this.route}/${this.userAction}`, 
        userRegister
      ).pipe( 
        map(obj => obj),
        catchError(error => this.errorHandler(error))
      );
    }

    forgot(userForgotPass: UserResetPass): Observable<UserResetPass>
    {
      this.route = this.api.route.user;
      this.userAction = this.api.userAction.forgot;

      return this.http.post<UserResetPass>(
        `${this.baseUrl}/${this.route}/${this.userAction}`, 
        userForgotPass
      ).pipe( 
        map(obj => obj),
        catchError(error => this.errorHandler(error))
      );
    }
    reset(userResetPass: UserResetPass): Observable<UserResetPass>
    {
      this.route = this.api.route.user;
      this.userAction = this.api.userAction.resetPass;

      return this.http.post<UserResetPass>(
        `${this.baseUrl}/${this.route}/${this.userAction}`, 
        userResetPass
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
        let showMsg = '';
        let param = '';
        if(errorRes.error.data)
        {
          showMsg = errorRes.error.data[0].msg;
          param = errorRes.error.data[0].param;
          this.showMessage(param + ' ' + showMsg, true);
        }else if(errorRes.error.msg)
        {
          showMsg = errorRes.error.msg;
          this.showMessage(showMsg, true);
        }
        // this.showMessage(' ', true);
        return EMPTY;
      }
}
