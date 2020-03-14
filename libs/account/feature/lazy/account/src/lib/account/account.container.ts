import { Component, OnInit, TemplateRef } from '@angular/core';
import { Dialog } from '@wws/common/ui/dialog';

@Component({
  selector: 'wws-account',
  templateUrl: './account.container.html',
  styleUrls: ['./account.container.scss']
})
export class AccountContainer implements OnInit {

  constructor(public dialog: Dialog) { }

  ngOnInit(): void {
  }

  onLogged(data) {
    console.log(data);

  }

  open(template: TemplateRef<any>) {
    this.dialog.openFromTemplate(template)
      .afterClosed()
  }

}
