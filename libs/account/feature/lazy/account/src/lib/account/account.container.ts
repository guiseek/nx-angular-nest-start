import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wws-account',
  templateUrl: './account.container.html',
  styleUrls: ['./account.container.scss']
})
export class AccountContainer implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onLogged(data) {
    console.log(data);

  }

}
