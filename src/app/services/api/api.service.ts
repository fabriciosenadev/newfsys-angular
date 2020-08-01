import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    url = 'https://newfsys-backend.herokuapp.com'; 

    route = {
        user: 'user',
        launch: 'launch',
        system: 'system',
        category: 'category',
    };

    userAction = {
        register: 'register',
        login: 'login',
        forgot: 'forgot',
        resetPass: 'reset_password'
    };

    launchAction = {
        in: 'in',
        out: 'out',
        filter: 'filter',
    };

    categoryAction = {
        new: 'new',
    };

    systemRoute = {
        user: 'user',
        categories: 'categories',
        payMethod: 'pay_methods',
    };

    systemAction = {
        userInfo: 'info',
        categoriesIn: 'in',
        categoriesOut: 'out',
    };

    constructor() { }
}
