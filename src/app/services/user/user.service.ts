import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../components/models/user.model';
import { ApiService } from "../api/api.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(
    private http: HttpClient,
    private api: ApiService
    ) { }

    register(user: User): Observable<User>
    {
      const baseUrl = this.api.url;
      const route = this.api.route.user;
      const action = this.api.userAction.register;

      console.log(`URL Target:${baseUrl}/${route}/${action}`);
      return this.http.post<User>(`${baseUrl}/${route}/${action}`, user);
    }
  

}
