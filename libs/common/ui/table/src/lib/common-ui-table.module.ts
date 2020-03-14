import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormatCellPipe } from './pipes/format-cell.pipe';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule
  ],
  declarations: [
    TableComponent,
    FormatCellPipe
  ],
  providers: [DatePipe],
  exports: [TableComponent]
})
export class CommonUiTableModule {}
