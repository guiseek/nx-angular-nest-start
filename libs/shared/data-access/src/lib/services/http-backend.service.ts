import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataAccessConfig } from '../data-access-config';
import { DATA_ACCESS_CONFIG } from './../data-access-injectors';

@Injectable({
  providedIn: 'root'
})
export class HttpBackendService<T = any> {
  protected prefix: string;
  protected endpoint: string = '';
  constructor(
    private http: HttpClient,
    @Inject(DATA_ACCESS_CONFIG) private config: DataAccessConfig
  ) {
    this.prefix = config.apiPrefix;
    console.log('config: ', this.prefix);
  }
  findOne(id: number | string): Observable<T> {
    return this.http.get<T>(`${ this.prefix }/${ this.endpoint }/${ id }`);
  }
  findMany(criteria?: { [k: string]: string }): Observable<T[]> {
    const params = {};
    // if (!!criteria) Object.keys(criteria)
    return this.http.get<T[]>(`${ this.prefix }/${ this.endpoint }`);
  }

  createOne(data: T) {
    return this.http.post(`${ this.prefix }/${ this.endpoint }`, data);
  }
  updateOne(id: number, data: Partial<T>) {
    return this.http.put(`${ this.prefix }/${ this.endpoint }/${ id }`, data);
  }
}
