import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { Dialog } from './dialog';
import { DialogConfig } from './dialog-config';
import { DIALOG_CONFIG, DIALOG_CONTAINER, DIALOG_REF, WWS_DIALOG_SCROLL_STRATEGY_PROVIDER } from './dialog-injectors';
import { DialogRef } from './dialog-ref';
import { DialogContainer } from './dialog/dialog.container';

@NgModule({
  imports: [
    OverlayModule,
    PortalModule,
    A11yModule
  ],
  exports: [
    PortalModule,
    DialogContainer
  ],
  declarations: [
    DialogContainer
  ],
  providers: [
    Dialog,
    WWS_DIALOG_SCROLL_STRATEGY_PROVIDER,
    { provide: DIALOG_REF, useValue: DialogRef },
    { provide: DIALOG_CONTAINER, useValue: DialogContainer },
    { provide: DIALOG_CONFIG, useValue: DialogConfig },
  ],
  entryComponents: [
    DialogContainer
  ]
})
export class CommonUiDialogModule { }
