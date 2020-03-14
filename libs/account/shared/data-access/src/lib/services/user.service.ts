import { Injectable } from '@angular/core';
import { IUser } from '@wws/api-interfaces';
import { HttpBackendService } from '@wws/shared/data-access';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpBackendService<IUser> {
  protected endpoint = 'users';

  myCompanies() {
    return this.http.get(`${ this.prefix }/${ this.endpoint }/my-companies`);
  }
}
