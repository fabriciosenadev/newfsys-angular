import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    url = 'http://localhost:3040';

    route = {
        user: 'user',
        launching: 'launching',
        system: 'system',
    };

    userAction = {
        register: 'register',
        login: 'login',
        forgot: 'forgot',
        resetPass: 'reset_password'
    };

    systemRoute = {
        user: 'user',
        categories: 'categories',
    };

    systemAction = {
        userInfo: 'info',
        categoriesIn: 'in',
        categoriesOut: 'out',
    };

    constructor() { }
}
