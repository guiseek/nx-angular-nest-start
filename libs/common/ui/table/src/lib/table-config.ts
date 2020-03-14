import { Subject } from 'rxjs';

export interface TableColumn<T = any> {
  columnDef: string
  header: string
  cell: (element: T) => string,
  format?: string,
  cellClass?: string | string[],
  cellState?: (element: any) => string
}

export interface TableConfig {
  endpoint: string
  columns: TableColumn[]
  click?: Subject<any>;
  refresh?: Subject<boolean>
}