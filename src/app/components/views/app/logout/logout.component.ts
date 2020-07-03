import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/system/session.service';

@Component({
    selector: 'app-logout',
    template: `
    <p>
      logout works!
    </p>
  `,
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(
        private router: Router,
        private sessionService: SessionService
    ) {
        localStorage.clear();
        this.sessionService.showMessage('Until next!');
        this.router.navigate(['/login']);
    }

    ngOnInit(): void {
    }
}
