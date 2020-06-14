import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApiService } from "../api/api.service";
import { User } from '../../components/models/user.model';
import { MessageService } from 'src/app/handlers/error/message.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private msgService: MessageService
    ) { }

    baseUrl = this.api.url;
    route = '';
    userAction = '';

    register(user: User): Observable<User>
    {
      this.route = this.api.route.user;
      this.userAction = this.api.userAction.register;

      return this.http.post<User>(
        `${this.baseUrl}/${this.route}/${this.userAction}`, 
        user
      ).pipe( 
        map(obj => obj),
        catchError(error => this.msgService.errorHandler(error))
      );
    }
}
