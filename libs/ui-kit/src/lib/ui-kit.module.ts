import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { Dialog } from './dialog/dialog';
import { DialogConfig } from './dialog/dialog-config';
import { DIALOG_CONFIG, DIALOG_CONTAINER, DIALOG_REF, WWS_DIALOG_SCROLL_STRATEGY_PROVIDER } from './dialog/dialog-injectors';
import { DialogRef } from './dialog/dialog-ref';
import { DialogContainer } from './dialog/dialog.container';
import { FormatCellPipe } from './table/pipes/format-cell.pipe';
import { TableComponent } from './table/table/table.component';

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    OverlayModule,
    PortalModule,
    A11yModule,
  ],
  exports: [
    PortalModule,
    TableComponent,
    DialogContainer
  ],
  declarations: [
    TableComponent,
    FormatCellPipe,
    DialogContainer
  ],
  providers: [
    Dialog,
    DatePipe,
    WWS_DIALOG_SCROLL_STRATEGY_PROVIDER,
    { provide: DIALOG_REF, useValue: DialogRef },
    { provide: DIALOG_CONTAINER, useValue: DialogContainer },
    { provide: DIALOG_CONFIG, useValue: DialogConfig },
  ],
  entryComponents: [
    DialogContainer
  ]
})
export class UiKitModule { }
