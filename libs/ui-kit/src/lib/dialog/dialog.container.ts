import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, DomPortal, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, ElementRef, EmbeddedViewRef, HostBinding, Inject, OnDestroy, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { DialogConfig } from './dialog-config';


export function throwDialogContentAlreadyAttachedError() {
  throw Error('Attempting to attach dialog content after content is already attached');
}

@Component({
  selector: 'wws-dialog',
  templateUrl: './dialog.container.html',
  styleUrls: ['./dialog.container.scss'],
  encapsulation: ViewEncapsulation.None,
  // O uso do OnPush para caixas de diálogo causou alguns problemas de sincronização do G3. Desativado até que possamos localizá-los.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('dialog', [
      state('enter', style({opacity: 1})),
      state('exit, void', style({opacity: 0})),
      transition('* => enter', animate('{{enterAnimationDuration}}')),
      transition('* => exit, * => void', animate('{{exitAnimationDuration}}')),
    ])
  ],
  host: {
    '[@dialog]': `{
      value: _state,
      params: {
        enterAnimationDuration: _config.enterAnimationDuration,
        exitAnimationDuration: _config.exitAnimationDuration
      }
    }`,
    '(@dialog.start)': '_onAnimationStart($event)',
    '(@dialog.done)': '_animationDone.next($event)',
  },
})
export class DialogContainer extends BasePortalOutlet implements OnDestroy {
  private readonly _document: Document;

  /** Estado da animação da dialog. */
  _state: 'void' | 'enter' | 'exit' = 'enter';

  /** Elemento que foi focado antes da abertura da dialog. Salve isso para restaurar quando fechar. */
  private _elementFocusedBeforeDialogWasOpened: HTMLElement | null = null;

   /** A classe que intercepta e gerencia o foco na dialog. */
  private _focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);

  // @HostBinding é usado na classe, pois espera-se que seja estendido. Desde o decorador @Component
  // os metadados não são herdados pelas classes filho, em vez disso, os dados de ligação do host são definidos de uma maneira
  // que pode ser herdado.
  // tslint:disable:no-host-decorator-in-concrete
  @HostBinding('attr.aria-label') get _ariaLabel() { return this._config.ariaLabel || null; }

  @HostBinding('attr.aria-describedby')
  get _ariaDescribedBy() { return this._config.ariaDescribedBy; }

  @HostBinding('attr.role') get _role() { return this._config.role; }

  @HostBinding('attr.aria-modal') _ariaModal: boolean = true;

  @HostBinding('attr.tabindex') get _tabindex() { return -1; }
  // tslint:disable:no-host-decorator-in-concrete

  /** O host do portal dentro deste contêiner no qual o conteúdo da dialog será carregado. */
  @ViewChild(CdkPortalOutlet, {static: true}) _portalHost: CdkPortalOutlet;

  /** Um assunto emitido antes da dialog entra na visualização. */
  _beforeEnter: Subject<void> = new Subject();

  /** Um assunto emitido após o diálogo entra na visualização. */
  _afterEnter: Subject<void> = new Subject();

  /** Um assunto emitido antes da dialog sai da visualização. */
  _beforeExit: Subject<void> = new Subject();

  /** Um assunto emitido após o diálogo sai da visualização. */
  _afterExit: Subject<void> = new Subject();

  /** Fluxo de eventos de animação `done`. */
  _animationDone = new Subject<AnimationEvent>();

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _focusTrapFactory: FocusTrapFactory,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(DOCUMENT) _document: any,
    /** The dialog configuration. */
    public _config: DialogConfig) {
    super();

    this._document = _document;

    // Usamos um Subject com umUntilChanged, em vez de um retorno de chamada anexado a .done,
    // porque alguns navegadores acionam o evento concluído duas vezes e não queremos emitir eventos duplicados.
    // See: https://github.com/angular/angular/issues/24084
    this._animationDone.pipe(distinctUntilChanged((x, y) => {
      return x.fromState === y.fromState && x.toState === y.toState;
    })).subscribe(event => {
      // Emit lifecycle events based on animation `done` callback.
      if (event.toState === 'enter') {
        this._autoFocusFirstTabbableElement();
        this._afterEnter.next();
        this._afterEnter.complete();
      }

      if (event.fromState === 'enter' && (event.toState === 'void' || event.toState === 'exit')) {
        this._returnFocusAfterDialog();
        this._afterExit.next();
        this._afterExit.complete();
      }
    });
  }

  /** Destrua a armadilha de foco para colocar o foco de volta no elemento focado antes da dialog ser aberta. */
  ngOnDestroy() {
    this._focusTrap.destroy();
    this._animationDone.complete();
  }

  /**
   * Anexe um ComponentPortal como conteúdo a este contêiner de diálogo.
   Portal @param Portal a ser anexado como o conteúdo da dialog.
   */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this._portalHost.hasAttached()) {
      throwDialogContentAlreadyAttachedError();
    }

    this._savePreviouslyFocusedElement();
    return this._portalHost.attachComponentPortal(portal);
  }

  /**
   * Anexe um TemplatePortal como conteúdo a este contêiner de diálogo.
   Portal @param Portal a ser anexado como o conteúdo da dialog.
   */
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this._portalHost.hasAttached()) {
      throwDialogContentAlreadyAttachedError();
    }

    this._savePreviouslyFocusedElement();
    return this._portalHost.attachTemplatePortal(portal);
  }

  /**
   * Anexa um portal DOM ao contêiner de diálogo.
   * @param portal Portal a ser anexado.
   * @ obsoleto Para ser transformado em um método.
   * @breaking-change 10.0.0
   */
  attachDomPortal = (portal: DomPortal) => {
    if (this._portalHost.hasAttached()) {
      throwDialogContentAlreadyAttachedError();
    }

    this._savePreviouslyFocusedElement();
    return this._portalHost.attachDomPortal(portal);
  }

  /** Emita eventos do ciclo de vida com base no retorno de chamada da animação `start`. */
  _onAnimationStart(event: AnimationEvent) {
    if (event.toState === 'enter') {
      this._beforeEnter.next();
      this._beforeEnter.complete();
    }
    if (event.fromState === 'enter' && (event.toState === 'void' || event.toState === 'exit')) {
      this._beforeExit.next();
      this._beforeExit.complete();
    }
  }

  /** Inicia a animação de saída da dialog. */
  _startExiting(): void {
    this._state = 'exit';

    // Marque o contêiner para verificação, para que ele possa reagir se o
    // view container está usando a detecção de alterações OnPush.
    this._changeDetectorRef.markForCheck();
  }

  /** Salva uma referência ao elemento focado antes da abertura da dialog. */
  private _savePreviouslyFocusedElement() {
    if (this._document) {
      this._elementFocusedBeforeDialogWasOpened = this._document.activeElement as HTMLElement;

      // Mova o foco imediatamente para a dialog para impedir que o usuário acidentalmente
      // abrir várias caixas de diálogo ao mesmo tempo. Precisa ser assíncrono, porque o elemento
      // pode não ser focável imediatamente.
      Promise.resolve().then(() => this._elementRef.nativeElement.focus());
    }
  }

  /**
   * Focar automaticamente o primeiro elemento com tabela dentro da dialog, se não houver um elemento com tabela,
   * concentre a dialog.
   */
  private _autoFocusFirstTabbableElement() {
    const element = this._elementRef.nativeElement;

    // Se você tentar se concentrar imediatamente, o conteúdo da dialog ainda não será
    // pronto nos casos em que a detecção de alterações deve ser executada primeiro. Para lidar com isso, simplesmente
    // aguarde a fila da microtask estar vazia.
    if (this._config.autoFocus) {
      this._focusTrap.focusInitialElementWhenReady().then(hasMovedFocus => {
        // Se não encontramos nenhum elemento focalizável dentro da dialog, foque o
        // container para que o usuário não possa tabular em outros elementos atrás dele.
        if (!hasMovedFocus) {
          element.focus();
        }
      });
    } else {
      const activeElement = this._document.activeElement;

      // Caso contrário, verifique se o foco está no contêiner de diálogo. É possível que um diferente
      // O componente tentou mover o foco enquanto a animação aberta estava em execução. Vejo:
      // https://github.com/angular/components/issues/16215. Observe que queremos apenas fazer isso
      // se o foco ainda não estiver dentro da dialog, porque é possível que o consumidor
      // desativou o `autoFocus` para mover o foco.
      if (activeElement !== element && !element.contains(activeElement)) {
        element.focus();
      }
    }
  }

  /** Retorna o foco para o elemento focado antes da dialog ser aberta. */
  private _returnFocusAfterDialog() {
    const toFocus = this._elementFocusedBeforeDialogWasOpened;
    // Precisamos de uma verificação extra, porque o IE pode definir o `activeElement` como nulo em alguns casos.
    if (toFocus && typeof toFocus.focus === 'function') {
      const activeElement = this._document.activeElement;
      const element = this._elementRef.nativeElement;

      // Verifique se o foco ainda está dentro da dialog ou no corpo (geralmente porque um
      // elemento não focalizável como o pano de fundo foi clicado) antes de movê-lo. É possível que
      // o consumidor o moveu antes da animação ser concluída; nesse caso, não devemos
      // faça qualquer coisa.
      if (!activeElement || activeElement === this._document.body || activeElement === element ||
        element.contains(activeElement)) {
        toFocus.focus();
      }
    }
  }
}
