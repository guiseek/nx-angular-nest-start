import { animate, animateChild, animation, query, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableConfig } from '../table-config';

const customAnimation = animation(
  [
    style({
      opacity: '{{opacity}}',
      transform: 'scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})'
    }),
    animate('{{duration}} {{delay}} cubic-bezier(0.0, 0.0, 0.2, 1)', style('*'))
  ],
  {
    params: {
      duration: '200ms',
      delay: '0ms',
      opacity: '0',
      scale: '1',
      x: '0',
      y: '0',
      z: '0'
    }
  }
);

@Component({
  selector: 'wws-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('animate', [
      transition('void => *', [useAnimation(customAnimation)])
    ]),
    trigger('animateStagger', [
      state('50', style('*')),
      state('100', style('*')),
      state('200', style('*')),

      transition(
        'void => 50',
        query('@*', [stagger('50ms', [animateChild()])], { optional: true })
      ),
      transition(
        'void => 100',
        query('@*', [stagger('100ms', [animateChild()])], { optional: true })
      ),
      transition(
        'void => 200',
        query('@*', [stagger('200ms', [animateChild()])], { optional: true })
      )
    ]),

  ]
})
export class TableComponent extends DataSource<any> implements OnInit {
  @Input() config: TableConfig = {
    endpoint: '',
    columns: []
  };

  displayedColumns = [];
  data = [];

  destroy$ = new Subject<void>();

  @Output() clicked = new EventEmitter();

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.displayedColumns = this.config.columns.map(c => c.columnDef);

    if (!!this.config && this.config.endpoint) {
      this.call(this.config);
    }

    if (!!this.config && this.config.refresh) {
      this.config.refresh
        .subscribe(() => this.call(this.config));
    }
  }

  call({ endpoint }) {
    this.http.get(endpoint)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        console.log(data)
        this.data = data;
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    // ...
    console.log('connect');
    return of(this.data);
    // return this.dataSubject.asObservable()
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('disconnect');
    this.destroy$.next();
    this.destroy$.complete();
  }
}
