import { Injectable } from '@angular/core';
import { IUser } from '@wws/api-interfaces';
import { HttpBackendService } from '@wws/shared/data-access';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpBackendService<IUser> {
  protected endpoint = 'users';
}
