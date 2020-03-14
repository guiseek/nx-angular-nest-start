import { Directionality } from '@angular/cdk/bidi';
import {
  ComponentType,
  Overlay,
  OverlayConfig,
  OverlayRef,
  ScrollStrategy
} from '@angular/cdk/overlay';
import {
  ComponentPortal,
  PortalInjector,
  TemplatePortal
} from '@angular/cdk/portal';
import { Location } from '@angular/common';
import {
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  OnDestroy,
  Optional,
  SkipSelf,
  TemplateRef,
  Type
} from '@angular/core';
import { defer, Observable, of as observableOf, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DialogConfig } from './dialog-config';
import {
  DIALOG_CONFIG,
  DIALOG_CONTAINER,
  DIALOG_DATA,
  DIALOG_REF,
  DIALOG_SCROLL_STRATEGY
} from './dialog-injectors';
import { DialogRef } from './dialog-ref';
import { DialogContainer } from './dialog.container';

/**
 * Serviço para abrir diálogos modais.
 */
@Injectable()
export class Dialog implements OnDestroy {
  private _scrollStrategy: () => ScrollStrategy;

  /** Fluxo que é emitido quando todas as caixas de diálogo são fechadas. */
  get _afterAllClosed(): Observable<void> {
    return this._parentDialog
      ? this._parentDialog.afterAllClosed
      : this._afterAllClosedBase;
  }
  _afterAllClosedBase = new Subject<void>();

  // TODO(jelbourn): aperte o tipo no lado direito desta expressão.
  afterAllClosed: Observable<void> = defer(() =>
    this.openDialogs.length
      ? this._afterAllClosed
      : this._afterAllClosed.pipe(startWith(undefined))
  );

  /** Fluxo emitido quando uma caixa de diálogo é aberta. */
  get afterOpened(): Subject<DialogRef<any>> {
    return this._parentDialog
      ? this._parentDialog.afterOpened
      : this._afterOpened;
  }
  _afterOpened: Subject<DialogRef<any>> = new Subject();

  /** Fluxo emitido quando uma caixa de diálogo é aberta. */
  get openDialogs(): DialogRef<any>[] {
    return this._parentDialog
      ? this._parentDialog.openDialogs
      : this._openDialogs;
  }
  _openDialogs: DialogRef<any>[] = [];

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    @Inject(DIALOG_REF) private _dialogRefConstructor: Type<DialogRef<any>>, // com o tipo apropriado assim que começarmos a usar o Ivy.
    // TODO (crisbeto): o `any` aqui pode ser substituído
    @Inject(DIALOG_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() @SkipSelf() private _parentDialog: Dialog,
    @Optional() location: Location
  ) {
    // Feche todas as caixas de diálogo quando o usuário avançar / retroceder no histórico ou quando o
    // o hash da localização é alterado. Observe que isso geralmente não inclui clicar em links (a menos que
    // o usuário está usando o `HashLocationStrategy`).
    if (!_parentDialog && location) {
      location.subscribe(() => this.closeAll());
    }

    this._scrollStrategy = scrollStrategy;
  }

  /** Obtém uma caixa de diálogo aberta por ID. */
  getById(id: string): DialogRef<any> | undefined {
    return this._openDialogs.find(ref => ref.id === id);
  }

  /** Fecha todas as caixas de diálogo abertas. */
  closeAll(): void {
    this.openDialogs.forEach(ref => ref.close());
  }

  /** Abre uma caixa de diálogo a partir de um componente. */
  openFromComponent<T>(
    component: ComponentType<T>,
    config?: DialogConfig
  ): DialogRef<any> {
    config = this._applyConfigDefaults(config);

    if (config.id && this.getById(config.id)) {
      throw Error(
        `Dialog with id "${config.id}" exists already. The dialog id must be unique.`
      );
    }

    const overlayRef = this._createOverlay(config);
    const dialogContainer = this._attachDialogContainer(overlayRef, config);
    const dialogRef = this._attachDialogContentForComponent(
      component,
      dialogContainer,
      overlayRef,
      config
    );

    this._registerDialogRef(dialogRef);
    return dialogRef;
  }

  /** Abre uma caixa de diálogo a partir de um modelo. */
  openFromTemplate<T>(
    template: TemplateRef<T>,
    config?: DialogConfig
  ): DialogRef<any> {
    config = this._applyConfigDefaults(config);

    if (config.id && this.getById(config.id)) {
      throw Error(
        `Dialog with id "${config.id}" exists already. The dialog id must be unique.`
      );
    }

    const overlayRef = this._createOverlay(config);
    const dialogContainer = this._attachDialogContainer(overlayRef, config);
    const dialogRef = this._attachDialogContentForTemplate(
      template,
      dialogContainer,
      overlayRef,
      config
    );

    this._registerDialogRef(dialogRef);
    return dialogRef;
  }

  ngOnDestroy() {
    // Apenas feche todos os diálogos neste nível.
    this._openDialogs.forEach(ref => ref.close());
  }

  /**
   * Encaminha eventos de emissão para quando as caixas de diálogo são abertas e todas as caixas de diálogo são fechadas.
   */
  private _registerDialogRef(dialogRef: DialogRef<any>): void {
    this.openDialogs.push(dialogRef);

    const dialogOpenSub = dialogRef.afterOpened().subscribe(() => {
      this.afterOpened.next(dialogRef);
      dialogOpenSub.unsubscribe();
    });

    const dialogCloseSub = dialogRef.afterClosed().subscribe(() => {
      let dialogIndex = this._openDialogs.indexOf(dialogRef);

      if (dialogIndex > -1) {
        this._openDialogs.splice(dialogIndex, 1);
      }

      if (!this._openDialogs.length) {
        this._afterAllClosedBase.next();
        dialogCloseSub.unsubscribe();
      }
    });
  }

  /**
   * Cria uma configuração de sobreposição a partir de uma configuração de diálogo.
   * @param config A configuração da caixa de diálogo.
   * @returns A configuração da sobreposição.
   */
  protected _createOverlay(config: DialogConfig): OverlayRef {
    const overlayConfig = new OverlayConfig({
      positionStrategy: this._overlay.position().global(),
      scrollStrategy: this._scrollStrategy(),
      panelClass: config.panelClass,
      hasBackdrop: config.hasBackdrop,
      direction: config.direction,
      minWidth: config.minWidth,
      minHeight: config.minHeight,
      maxWidth: config.maxWidth,
      maxHeight: config.maxHeight
    });

    if (config.backdropClass) {
      overlayConfig.backdropClass = config.backdropClass;
    }
    return this._overlay.create(overlayConfig);
  }

  /**
   * Anexa um FloatDialogContainer à sobreposição já criada de uma caixa de diálogo.
   * sobreposição de @param Referência à sobreposição subjacente da caixa de diálogo.
   * @param config A configuração da caixa de diálogo.
   * @returns Uma promessa resolvida para um ComponentRef para o contêiner anexado.
   */
  protected _attachDialogContainer(
    overlay: OverlayRef,
    config: DialogConfig
  ): DialogContainer {
    const container =
      config.containerComponent || this._injector.get(DIALOG_CONTAINER);
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = new PortalInjector(
      userInjector || this._injector,
      new WeakMap([[DialogConfig, config]])
    );
    const containerPortal = new ComponentPortal(
      container,
      config.viewContainerRef,
      injector
    );
    const containerRef: ComponentRef<DialogContainer> = overlay.attach(
      containerPortal
    );
    containerRef.instance._config = config;

    return containerRef.instance;
  }

  /**
   * Anexa o componente fornecido pelo usuário ao FloatDialogContainer já criado.
   * @param componentOrTemplateRef O tipo de componente que está sendo carregado na caixa de diálogo,
   * ou um TemplateRef para instanciar como o conteúdo.
   * @param dialogContainer Referência ao FloatDialogContainer de quebra automática.
   * @param overlayRef Referência à sobreposição na qual a caixa de diálogo reside.
   * @param config A configuração da caixa de diálogo.
   * @returns Uma promessa resolvida para o FloatDialogRef que deve ser devolvida ao usuário.
   */
  protected _attachDialogContentForComponent<T>(
    componentOrTemplateRef: ComponentType<T>,
    dialogContainer: DialogContainer,
    overlayRef: OverlayRef,
    config: DialogConfig
  ): DialogRef<any> {
    // Crie uma referência à caixa de diálogo que estamos criando, a fim de fornecer ao usuário uma alça
    // para modificá-lo e fechá-lo.
    const dialogRef = new this._dialogRefConstructor(
      overlayRef,
      dialogContainer,
      config.id
    );
    const injector = this._createInjector<T>(
      config,
      dialogRef,
      dialogContainer
    );
    const contentRef = dialogContainer.attachComponentPortal(
      new ComponentPortal(componentOrTemplateRef, undefined, injector)
    );

    dialogRef.componentInstance = contentRef.instance;
    dialogRef.disableClose = config.disableClose;

    dialogRef
      .updateSize({ width: config.width, height: config.height })
      .updatePosition(config.position);

    return dialogRef;
  }

  /**
   * Anexa o componente fornecido pelo usuário ao FloatDialogContainer já criado.
   * @param componentOrTemplateRef O tipo de componente que está sendo carregado na caixa de diálogo,
   * ou um TemplateRef para instanciar como o conteúdo.
   * @param dialogContainer Referência ao FloatDialogContainer de quebra automática.
   * @param overlayRef Referência à sobreposição na qual a caixa de diálogo reside.
   * @param config A configuração da caixa de diálogo.
   * @returns Uma promessa resolvida para o FloatDialogRef que deve ser devolvida ao usuário.
   */
  protected _attachDialogContentForTemplate<T>(
    componentOrTemplateRef: TemplateRef<T>,
    dialogContainer: DialogContainer,
    overlayRef: OverlayRef,
    config: DialogConfig
  ): DialogRef<any> {
    // Crie uma referência à caixa de diálogo que estamos criando, a fim de fornecer ao usuário uma alça
    // para modificá-lo e fechá-lo.
    const dialogRef = new this._dialogRefConstructor(
      overlayRef,
      dialogContainer,
      config.id
    );

    dialogContainer.attachTemplatePortal(
      new TemplatePortal<T>(componentOrTemplateRef, null!, <any>{
        $implicit: config.data,
        dialogRef
      })
    );
    dialogRef
      .updateSize({ width: config.width, height: config.height })
      .updatePosition(config.position);

    return dialogRef;
  }

  /**
   * Cria um injetor personalizado para ser usado dentro da caixa de diálogo. Isso permite que um componente carregado dentro
   * de um diálogo para se fechar e, opcionalmente, para retornar um valor.
   * @param config Objeto de configuração usado para construir a caixa de diálogo.
   * @param dialogRef Referência à caixa de diálogo.
   * @param container Elemento de caixa de diálogo que envolve todo o conteúdo.
   * @returns O injetor personalizado que pode ser usado dentro da caixa de diálogo.
   */
  private _createInjector<T>(
    config: DialogConfig,
    dialogRef: DialogRef<T>,
    dialogContainer: DialogContainer
  ): PortalInjector {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;
    const injectionTokens = new WeakMap<any, any>([
      [this._injector.get(DIALOG_REF), dialogRef],
      [this._injector.get(DIALOG_CONTAINER), dialogContainer],
      [DIALOG_DATA, config.data]
    ]);

    if (
      config.direction &&
      (!userInjector ||
        !userInjector.get<Directionality | null>(Directionality, null))
    ) {
      injectionTokens.set(Directionality, {
        value: config.direction,
        change: observableOf()
      });
    }

    return new PortalInjector(userInjector || this._injector, injectionTokens);
  }

  /**
   * Expande o objeto de configuração fornecido para incluir os valores padrão para propriedades que
   * são indefinidos.
   */
  private _applyConfigDefaults(config?: DialogConfig): DialogConfig {
    const dialogConfig = this._injector.get(
      DIALOG_CONFIG
    ) as typeof DialogConfig;
    return { ...new dialogConfig(), ...config };
  }
}
