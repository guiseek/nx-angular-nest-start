import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message } from '@wws/api-interfaces';
import { take } from 'rxjs/operators';

@Component({
  selector: 'wws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello')
    .pipe(take(1));
  constructor(private http: HttpClient) {}

  onLogged(data) {
    console.log(data);

  }
}
