import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ApiService } from "../api/api.service";
import { UserRegister, UserResetPass, UserInfo } from '../../models/user.model';
import { SessionService } from '../system/session.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userData = new BehaviorSubject<UserRegister>({
    full_name: '',
    email: '',
    password: '',
    verifyPass: ''
  }); 

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private sessionService: SessionService
    ) { }

    baseUrl = this.api.url;
    route = '';
    action = '';

    get userData(): UserRegister
    {
      return this._userData.value;
    }
  
    set userData(userData: UserRegister)
    {
      this._userData.next(userData);
    }
    

    register(userRegister: UserRegister): Observable<UserRegister>
    {
      this.route = this.api.route.user;
      this.action = this.api.userAction.register;

      return this.http.post<UserRegister>(
        `${this.baseUrl}/${this.route}/${this.action}`, 
        userRegister
      ).pipe( 
        map(obj => obj),
        catchError(error => this.errorHandler(error))
      );
    }

    forgot(userForgotPass: UserResetPass): Observable<UserResetPass>
    {
      this.route = this.api.route.user;
      this.action = this.api.userAction.forgot;

      return this.http.post<UserResetPass>(
        `${this.baseUrl}/${this.route}/${this.action}`, 
        userForgotPass
      ).pipe( 
        map(obj => obj),
        catchError(error => this.errorHandler(error))
      );
    }
    reset(userResetPass: UserResetPass): Observable<UserResetPass>
    {
      this.route = this.api.route.user;
      this.action = this.api.userAction.resetPass;

      return this.http.post<UserResetPass>(
        `${this.baseUrl}/${this.route}/${this.action}`, 
        userResetPass
      ).pipe( 
        map(obj => obj),
        catchError(error => this.errorHandler(error))
      );      
    }

    getInfo(userInfo: UserInfo): Observable<UserInfo>
    {
        this.route = this.api.route.user;
        this.action = this.api.systemAction.userInfo;

        return this.http.get<UserResetPass>(
            `${this.baseUrl}/${this.route}/${this.action}`, 
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

        if(errorRes.error.auth === false) this.sessionService.forceLogin();

        let showMsg = '';
        let param = '';

        if(errorRes.error.data)
        {
          showMsg = errorRes.error.data[0].msg;
          param = errorRes.error.data[0].param;
          this.showMessage(param + ' ' + showMsg, true);
        }
        else if(errorRes.error.msg)
        {
          showMsg = errorRes.error.msg;
          this.showMessage(showMsg, true);
        }

        return EMPTY;
      }
}
