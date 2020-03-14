import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormElement } from './login-form/login-form.element';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  entryComponents: [LoginFormElement],
  declarations: [LoginFormElement],
  exports: [LoginFormElement]
})
export class AuthElementsModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const elements: any[] = [
      [LoginFormElement, 'custom-login-form']
    ];
    for (const [component, name] of elements) {
      const el = createCustomElement(component, { injector: this.injector });
      customElements.define(name, el as any);
    }
  }
}
