import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DataAccessConfig } from '../data-access-config';
import { DATA_ACCESS_CONFIG } from './../data-access-injectors';

@Injectable({
  providedIn: 'root'
})
export class HttpBackendService {

  constructor(
    private http: HttpClient,
    @Inject(DATA_ACCESS_CONFIG) private config: DataAccessConfig
  ) {
    console.log(config);
  }
}
