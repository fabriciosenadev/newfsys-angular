import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <p>
      nav works!
    </p>
  `,
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
