import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'custom-login-form',
  templateUrl: './login-form.element.html',
  // styleUrls: ['./login-form.element.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormElement implements OnInit, OnDestroy {
  @Input() title = 'Wave Workspace';
  @Input() action: string;
  @Output() isLogged = new EventEmitter();

  form = this._fb.group({
    username: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required,Validators.minLength(4)]]
  });

  destroy$ = new Subject<void>();
  constructor(
    private _fb: FormBuilder,
    private _http: HttpClient,
    private _el: ElementRef,
    private _cd: ChangeDetectorRef
  ) { }

  state = {
    logged: false,
    valid: false
  }
  private setState(key, value) {
    this.state = { ...this.state, [key]: value };
    this._cd.detectChanges();
  }

  ngOnInit(): void {
    if (!this.action) {
      console.error('Missing action attribute');
    }
  }

  @Input()
  public log = () => console.log(this.state);

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this._http.post(this.action, this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.setState('logged', true);

        this.customEmit(true);
      })
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private customEmit(val) {
    this.isLogged.emit(val);
    const domEvent = new CustomEvent('is-logged');
    this._el.nativeElement.dispatchEvent(domEvent);
  }
}
