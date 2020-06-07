import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/template/header/header.service';

@Component({
  selector: 'app-register',
  template: `
    <p>
      register works!
    </p>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private headerService: HeaderService) {
    headerService.headerData = {
      routeUrl: 'register'
    }
   }

  ngOnInit(): void {
  }

}
