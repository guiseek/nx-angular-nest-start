import { Component } from '@angular/core';

@Component({
  selector: 'wws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  today = new Date();
  constructor() {}
}
