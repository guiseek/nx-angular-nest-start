import { Component, OnInit } from '@angular/core';
import { UserService } from '@wws/account/feature/shared/data-access';
import { IUser } from '@wws/api-interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'wws-users',
  templateUrl: './users.container.html',
  styleUrls: ['./users.container.scss']
})
export class UsersContainer implements OnInit {
  users$: Observable<IUser[]>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.findMany();
  }

}
