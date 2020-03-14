import { NgModule } from '@angular/core';
import { DataAccessConfig } from './data-access-config';
import { DATA_ACCESS_CONFIG } from './data-access-injectors';
import { HttpBackendService } from './services/http-backend.service';

@NgModule({
  imports: [],
  providers: [
    HttpBackendService,
    { provide: DATA_ACCESS_CONFIG, useValue: DataAccessConfig },
  ]
})
export class SharedDataAccessModule { }
