
import { ComponentType, Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';
import { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';
import { DialogContainer } from './dialog/dialog.container';

/** Token de injeção para a ScrollStrategy do Diálogo. */
export const DIALOG_SCROLL_STRATEGY =
  new InjectionToken<() => ScrollStrategy>('DialogScrollStrategy');

/** Token de injeção para os dados da caixa de diálogo. */
export const DIALOG_DATA = new InjectionToken<any>('DialogData');

/** Token de injeção para o construtor DialogRef. */
export const DIALOG_REF = new InjectionToken<DialogRef<any>>('DialogRef');

/** Token de injeção para o DialogConfig. */
export const DIALOG_CONFIG = new InjectionToken<DialogConfig>('DialogConfig');

/** Token de injeção para o componente DialogContainer do Dialog. */
export const DIALOG_CONTAINER =
  new InjectionToken<ComponentType<DialogContainer>>('DialogContainer');

/** @ docs-private */
export function WWS_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay):
  () => ScrollStrategy {
  return () => overlay.scrollStrategies.block();
}

/** @ docs-private */
export const WWS_DIALOG_SCROLL_STRATEGY_PROVIDER = {
  provide: DIALOG_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: WWS_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};