import { Injectable } from '@angular/core';
import { ICompany } from '@wws/api-interfaces';
import { HttpBackendService } from '@wws/shared/data-access';

@Injectable()
export class CompanyService extends HttpBackendService<ICompany> {
  protected endpoint = 'companies';

  my() {
    return this.http.get<ICompany[]>(`${this.prefix}/${this.endpoint}/my`)
  }
}