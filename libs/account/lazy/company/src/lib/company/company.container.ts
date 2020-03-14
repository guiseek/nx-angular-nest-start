import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@wws/account/shared/data-access';

@Component({
  selector: 'wws-company',
  templateUrl: './company.container.html',
  styleUrls: ['./company.container.scss']
})
export class CompanyContainer implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signOut() {
    this.auth.signOut()
      .then(() => this.router.navigateByUrl('/auth'));
  }
}
