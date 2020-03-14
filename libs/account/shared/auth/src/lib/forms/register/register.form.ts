import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '@wws/api-interfaces';

@Component({
  selector: 'wws-auth-register',
  templateUrl: './register.form.html',
  styleUrls: ['./register.form.scss']
})
export class RegisterForm extends FormGroup implements OnInit {
  @Input() email: string;

  @Output() action = new EventEmitter<IRegister>();

  constructor() {
    super({
      name: new FormGroup({
        first: new FormControl('', [Validators.required]),
        last: new FormControl(''),
      }),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }

  ngOnInit(): void {
    // if (!!this.email) {
    //   this.get('username').setValue(this.email);
    // }
  }

}
