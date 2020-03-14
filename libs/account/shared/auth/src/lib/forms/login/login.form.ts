import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '@wws/api-interfaces';

@Component({
  selector: 'wws-auth-login',
  templateUrl: './login.form.html',
  styleUrls: ['./login.form.scss']
})
export class LoginForm extends FormGroup implements OnInit {
  @Input() email: string;

  @Output() action = new EventEmitter<ILogin>();

  constructor() {
    super({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }

  ngOnInit(): void {
    if (!!this.email) {
      this.get('username').setValue(this.email);
    }
  }

}
