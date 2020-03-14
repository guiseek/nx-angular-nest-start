import { Direction } from '@angular/cdk/bidi';
import { ComponentType } from '@angular/cdk/portal';
import { DialogContainer } from './dialog/dialog.container';
import { ViewContainerRef } from '@angular/core';

export type DialogRole = 'dialog' | 'alertdialog';

/** Possíveis substituições para a posição de uma caixa de diálogo. */
export interface DialogPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export class DialogConfig<D = any> {
  /** Componente a ser usado como o contêiner da caixa de diálogo. */
  containerComponent?: ComponentType<DialogContainer>;

  /**
   * Onde o componente anexado deve residir na árvore de componentes * lógicos * do Angular.
   * Isso afeta o que está disponível para injeção e a ordem de detecção de alterações para o
   * componente instanciado dentro da caixa de diálogo. Isso não afeta onde a caixa de diálogo
   * o conteúdo será renderizado.
   */
  viewContainerRef?: ViewContainerRef;

  /** O ID da caixa de diálogo. */
  id?: string;

  /** O papel da ARIA no diálogo. */
  role?: DialogRole = 'dialog';

  /** Classes personalizadas para o painel de sobreposição. */
  panelClass?: string | string[] = '';

  /** Se a caixa de diálogo possui um plano de fundo. */
  hasBackdrop?: boolean = true;

  /** Classes personalizadas para o pano de fundo. */
  backdropClass?: string | undefined = '';

  /** Se o diálogo pode ser fechado por interação do usuário. */
  disableClose?: boolean = false;

  /** A largura da caixa de diálogo. */
  width?: string = '';

  /** A altura da caixa de diálogo. */
  height?: string = '';

  /** A largura mínima da caixa de diálogo. */
  minWidth?: string | number = '';

  /** A altura mínima da caixa de diálogo. */
  minHeight?: string | number = '';

  /** A largura máxima da caixa de diálogo. */
  maxWidth?: string | number = '80vw';

  /** A altura máxima da caixa de diálogo. */
  maxHeight?: string | number = '';

  /** A posição da caixa de diálogo. */
  position?: DialogPosition;

  /** Dados a serem injetados no conteúdo da caixa de diálogo. */
  data?: D | null = null;

  /** A direção do layout para o conteúdo da caixa de diálogo. */
  direction?: Direction;

  /** ID do elemento que descreve a caixa de diálogo. */
  ariaDescribedBy?: string | null = null;

  /** Rótulo da ária para atribuir ao elemento de diálogot */
  ariaLabel?: string | null = null;

  /** Se a caixa de diálogo deve focar o primeiro elemento focalizável em aberto. */
  autoFocus?: boolean = true;

  /** Duração da animação enter. Tem que ser um valor CSS válido (por exemplo, 100 ms). */
  enterAnimationDuration?: string = '225ms';

  /** Duração da animação de saída. Tem que ser um valor CSS válido (por exemplo, 50 ms). */
  exitAnimationDuration?: string = '225ms';
}