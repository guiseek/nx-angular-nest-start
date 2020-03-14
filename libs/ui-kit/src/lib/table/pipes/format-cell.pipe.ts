import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'formatCell' })
export class FormatCellPipe implements PipeTransform {
  constructor(
    private datePipe: DatePipe
  ) { }
  transform(value: any, format: string) {
    if (this.isNull(value)) {
      return '';
    }
    switch (format) {
      case 'date': return this.datePipe.transform(value)
      case 'currency': return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    }
    return value;
  }
  isNull(value: any) {
    return value === undefined || value === null || value === 'null'
  }
}