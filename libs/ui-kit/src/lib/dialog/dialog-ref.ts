
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { GlobalPositionStrategy, OverlayRef, OverlaySizeConfig } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DialogPosition } from './dialog-config';
import { DialogContainer } from './dialog.container';

/** ID exclusivo para a caixa de diálogo criada. */
let uniqueId = 0;

/**
 * Referência a uma caixa de diálogo aberta através do serviço Dialog.
 */
export class DialogRef<T, R = any> {
  /** A instância do componente na caixa de diálogo. */
  componentInstance: T;

  /** Se o usuário tem permissão para fechar a caixa de diálogo. */
  disableClose: boolean | undefined;

  /** Resultado a ser passado para afterClosed. */
  private _result: R | undefined;

  constructor(
    public _overlayRef: OverlayRef,
    protected _containerInstance: DialogContainer,
    readonly id: string = `dialog-${uniqueId++}`) {

    // Se a caixa de diálogo tiver um pano de fundo, lide com os cliques.
    if (_containerInstance._config.hasBackdrop) {
      _overlayRef.backdropClick().subscribe(() => {
        if (!this.disableClose) {
          this.close();
        }
      });
    }

    this.beforeClosed().subscribe(() => {
      this._overlayRef.detachBackdrop();
    });

    this.afterClosed().subscribe(() => {
      this._overlayRef.detach();
      this._overlayRef.dispose();
      this.componentInstance = null!;
    });

    // Fechar quando ocorrer um evento de tecla de escape
    _overlayRef.keydownEvents()
      .pipe(filter(event => {
        return event.keyCode === ESCAPE && !this.disableClose && !hasModifierKey(event);
      }))
      .subscribe(event => {
        event.preventDefault();
        this.close();
      });
  }

  /** Obtém um observável que é emitido quando o pano de fundo da sobreposição é clicado. */
  backdropClick(): Observable<MouseEvent> {
    return this._overlayRef.backdropClick();
  }

  /**
   * Feche a caixa de diálogo.
   * @param dialogResult Resultado opcional para retornar ao abridor de diálogo.
   */
  close(dialogResult?: R): void {
    this._result = dialogResult;
    this._containerInstance._startExiting();
  }

  /**
   * Atualiza a posição da caixa de diálogo.
   * posição @param Nova posição da caixa de diálogo.
   */
  updatePosition(position?: DialogPosition): this {
    let strategy = this._getPositionStrategy();

    if (position && (position.left || position.right)) {
      position.left ? strategy.left(position.left) : strategy.right(position.right);
    } else {
      strategy.centerHorizontally();
    }

    if (position && (position.top || position.bottom)) {
      position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
    } else {
      strategy.centerVertically();
    }

    this._overlayRef.updatePosition();

    return this;
  }

  /**
   * Obtém um observável emitido quando os eventos de pressionamento de tecla são direcionados na sobreposição.
   */
  keydownEvents(): Observable<KeyboardEvent> {
    return this._overlayRef.keydownEvents();
  }

  /**
   * Atualiza a largura e a altura da caixa de diálogo, definidas, mín. E máx.
   * @param size Novo tamanho para a sobreposição.
   */
  updateSize(size: OverlaySizeConfig): this {
    if (size.width) {
      this._getPositionStrategy().width(size.width.toString());
    }
    if (size.height) {
      this._getPositionStrategy().height(size.height.toString());
    }
    this._overlayRef.updateSize(size);
    this._overlayRef.updatePosition();
    return this;
  }

  /** Busca o objeto da estratégia de posição da referência de sobreposição. */
  private _getPositionStrategy(): GlobalPositionStrategy {
    return this._overlayRef.getConfig().positionStrategy as GlobalPositionStrategy;
  }

  /** Obtém um observável que é emitido quando o diálogo começa a abrir. */
  beforeOpened(): Observable<void> {
    return this._containerInstance._beforeEnter.asObservable();
  }

  /** Obtém um observável que é emitido quando a caixa de diálogo termina de abrir. */
  afterOpened(): Observable<void> {
    return this._containerInstance._afterEnter.asObservable();
  }

  /** Obtém um observável emitido quando o diálogo começa a fechar. */
  beforeClosed(): Observable<R | undefined> {
    return this._containerInstance._beforeExit.pipe(map(() => this._result));
  }

  /** Obtém um observável que é emitido quando o diálogo é concluído. */
  afterClosed(): Observable<R | undefined> {
    return this._containerInstance._afterExit.pipe(map(() => this._result));
  }
}
