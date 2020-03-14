import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '@wws/api-interfaces';

@Component({
  selector: 'wws-form-create-user',
  templateUrl: './create-user.form.html',
  styleUrls: ['./create-user.form.scss']
})
export class CreateUserForm extends FormGroup implements OnInit {
  @Input() user: IUser;

  @Output() action = new EventEmitter<IUser>();

  constructor() {
    super({
      name: new FormGroup({
        first: new FormControl('', Validators.required),
        last: new FormControl('', Validators.required)
      }),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }

  ngOnInit(): void {
    if (!!this.user) {
      this.patchValue(this.user);
    }
  }
}
