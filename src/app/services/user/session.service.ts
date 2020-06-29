import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ApiService } from '../api/api.service';
import { UserLogin } from 'src/app/components/models/user.model';

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

  login(user: UserLogin): Observable<UserLogin>
  {
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

  forceLogin(): void
  {
    this.showMessage('please do login', true);
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
    errorHandler(error: any): Observable<any> {
      console.log(error);
      this.showMessage(error.error.msg, true);
      return EMPTY;
    }
}
