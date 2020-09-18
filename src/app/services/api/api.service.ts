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
        updateStatus: 'update_status'
    };

    categoryAction = {
        new: 'new',
    };

    systemRoute = {
        user: 'user',
        categories: 'categories',
        payMethod: 'pay_methods',
        userProfile: 'user_profile',
        pieChart: 'pie_chart',
        detailsByCategory: 'details_by_category',
        launch: 'launch',
        checkScheduling: 'check_scheduling',
        createLaunchScheduled: 'create_launch_scheduled'
    };

    systemAction = {
        userInfo: 'info',
        categoriesIn: 'in',
        categoriesOut: 'out',
    };

    constructor() { }
}
