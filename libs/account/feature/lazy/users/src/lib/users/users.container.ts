import { Component, OnInit } from '@angular/core';
import { UserService } from '@wws/account/feature/shared/data-access';
import { TableConfig } from '@wws/common/ui/table';
import { Subject } from 'rxjs';

@Component({
  selector: 'wws-users',
  templateUrl: './users.container.html',
  styleUrls: ['./users.container.scss']
})
export class UsersContainer implements OnInit {
  clicked = new Subject();
  tableConfig: TableConfig = {
    columns: [
      { columnDef: 'id', header: '#', cell: (element) => element.id },
      { columnDef: 'name', header: 'Nome', cell: (element) => element.name.first },
      { columnDef: 'email', header: 'Email', cell: (element) => element.email },
      { columnDef: 'isActive', header: 'Status', cell: (element) => element.isActive }
    ],
    click: this.clicked,
    endpoint: '/api/users'
  }
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.users$ = this.userService.findMany();
    this.clicked.subscribe(console.log)
  }
}
