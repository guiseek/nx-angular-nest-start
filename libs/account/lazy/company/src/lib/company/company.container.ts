import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, CompanyService } from '@wws/account/shared/data-access';
import { ICompany } from '@wws/api-interfaces';
import { TableConfig } from '@wws/ui-kit';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'wws-company',
  templateUrl: './company.container.html',
  styleUrls: ['./company.container.scss']
})
export class CompanyContainer implements OnInit {
  form: FormGroup;
  companies$: Observable<ICompany>;

  refresh = new Subject<boolean>();
  clicked = new Subject<ICompany>();

  tableConfig: TableConfig = {
    endpoint: '/api/companies',
    columns: [
      { header: '#', cell: (row) => row.id, columnDef: 'id' },
      { header: 'Nome', cell: (row) => row.name, columnDef: 'name' }
    ],
    refresh: this.refresh,
    click: this.clicked
  };
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private company: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [],
      domain: [],
      description: [],
      users: []
    });

    this.auth.profile()
      .subscribe(user => {
        this.form.get('users')
          .patchValue([user])
      })
    this.company.my()
      .subscribe(console.log)
    this.clicked
      .subscribe(console.log)
  }

  onSubmit(data?) {
    console.log(data);

    this.company.createOne(this.form.value)
      .subscribe(console.log)

  }

  signOut() {
    this.auth.signOut()
      .then(() => this.router.navigateByUrl('/auth'));
  }
}
