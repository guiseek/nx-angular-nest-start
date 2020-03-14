import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableConfig } from '../table-config';

@Component({
  selector: 'wws-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent extends DataSource<any> implements OnInit {
  @Input() dataSource$: Array<any> = [];

  public dataSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  displayedColumns = [];


  @Input() config: TableConfig = {
    endpoint: '',
    columns: []
  };

  @Output() clicked = new EventEmitter();

  constructor(private http: HttpClient) {
    super();


  }

  ngOnInit(): void {
    this.displayedColumns = this.config.columns.map(c => c.columnDef);

    if (!!this.config && this.config.endpoint) {
      this.http.get(this.config.endpoint)
        .subscribe((data: any[]) => {
          console.log(data)
          this.dataSubject.next(data);
        })
    }
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    // ...
    console.log('connect');

    return this.dataSubject.asObservable()
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  showDetails(row: any) {

  }

}
