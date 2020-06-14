import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:3040';
  
  route = {
    user: 'user',
    launching:'launching',
  };

  userAction = {
    register:'register',
    login:'login'
  }
  
  constructor() { }
}
