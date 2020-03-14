import { Component, OnInit } from '@angular/core';
import { UserService } from '@wws/account/feature/shared/data-access';
import { IUser } from '@wws/api-interfaces';
import { TableConfig } from '@wws/common/ui/table';
import { Subject } from 'rxjs';

@Component({
  selector: 'wws-users',
  templateUrl: './users.container.html',
  styleUrls: ['./users.container.scss']
})
export class UsersContainer implements OnInit {
  clicked = new Subject();
  refresh = new Subject<boolean>();
  tableConfig: TableConfig = {
    columns: [
      { columnDef: 'id', header: '#', cell: (element) => element.id },
      { columnDef: 'name', header: 'Nome', cell: (element) => element.name.first },
      { columnDef: 'email', header: 'Email', cell: (element) => element.email },
      { columnDef: 'isActive', header: 'Status', cell: (element) => element.isActive }
    ],
    rowClass: 'cursor-pointer',
    click: this.clicked,
    refresh: this.refresh,
    endpoint: '/api/users'
  }
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.clicked
      .subscribe(console.log)
  }

  onCreateUser(data: IUser) {
    console.log(data);
    this.userService.createOne(data)
      .subscribe((res) => {
        console.log(res);
        this.refresh.next(true);
      })

  }
}
