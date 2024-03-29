# Wws

```bash
ng generate @nrwl/node:library --name=auth --directory=account/api
```

```bash
ng generate @nrwl/node:library --name=api --directory=account/feature --publishable --tags=scope:account,type:feature

ng generate @nestjs/schematics:module --name=account-feature-api --path=src/lib --sourceRoot=libs/account/feature/api --flat=true

ng generate @nestjs/schematics:controller --name=auth --path=src/lib/controllers --sourceRoot=libs/account/feature/api --flat=true

ng generate @nestjs/schematics:controller --name=users --path=src/lib/controllers --sourceRoot=libs/account/feature/api --flat=true

ng generate @nestjs/schematics:service --name=users --path=src/lib/services --sourceRoot=libs/account/feature/api --flat=true
ng generate @nestjs/schematics:service --name=users --path=src/lib/servicces --sourceRoot=libs/account/feature/api --flat=true
ng generate @nestjs/schematics:service --name=auth-mailer --path=src/lib/services --sourceRoot=libs/account/feature/api --flat=true

typeorm entity:create --dir libs/account/feature/api/src/lib/entities --name user

```

## Account Feature Lazy Users

```bash
ng generate @nrwl/angular:library --name=users --style=scss --directory=account/feature/lazy --lazy --parentModule=apps/app/src/app/app.module.ts --routing --tags=feature:lazy

ng generate @schematics/angular:component --name=users --project=account-feature-lazy-users --style=scss --type=Container
```

## Account Feature Lazy Account

```bash
ng generate @nrwl/angular:library --name=account --style=scss --directory=account/feature/lazy --lazy --parentModule=apps/app/src/app/app.module.ts --routing --tags=feature:lazy

ng generate @schematics/angular:component --name=account --project=account-feature-lazy-account --style=scss --type=Container
```

## Shared Data Acccess

```bash
ng generate @nrwl/angular:library --name=data-access --directory=shared --tags=shared:data-access

ng generate @schematics/angular:service --name=services/http-backend --project=shared-data-access
```

## Account Feature Shared Data Acccess

```bash
ng generate @nrwl/angular:library --name=data-access --directory=account/feature/shared --tags=feature:shared:data-access

ng generate @schematics/angular:service --name=services/auth --project=account-feature-shared-data-access

ng generate @schematics/angular:service --name=services/user --project=account-feature-shared-data-access
```

## Common Ui Dialog

```bash
ng generate @nrwl/angular:library --name=dialog --style=scss --directory=common/ui --tags=common:ui
```

## Account Feature Shared Auth

```bash
ng generate @nrwl/angular:library --name=auth --style=scss --directory=account/feature/shared --prefix=wws-auth --tags=feature:shared

ng generate @schematics/angular:component --name=dialogs/login --project=account-feature-shared-auth --style=scss --export --type=Dialog

ng generate @schematics/angular:component --name=dialogs/forgot-password --project=account-feature-shared-auth --style=scss --export --type=Dialog

ng generate @schematics/angular:component --name=dialogs/reset-password --project=account-feature-shared-auth --style=scss --export --type=Dialog
```

## Common Util Browser

```bash
ng generate @nrwl/workspace:library --name=browser --directory=common/util --tags=shared:util

ng generate @schematics/angular:class --name=database/database --project=common-util-browser

touch libs/common/util/browser/src/lib/database/databaase.config.ts
```

## Common Util Http

```bash
ng generate @nrwl/workspace:library --name=http --directory=common/util --tags=shared:util

ng generate @schematics/angular:interceptor --name=interceptors/token --project=common-util-http
```

## Common Ui Table

```bash
ng generate @nrwl/angular:library --name=table --style=scss --directory=common/ui --tags=common:ui

ng generate @schematics/angular:component --name=table --project=common-ui-table --style=scss --export --viewEncapsulation=None
```

---

## Companies

```bash
ng generate @nestjs/schematics:module --name=companies --path=src/lib/modules --sourceRoot=libs/account/feature/api

ng generate @nestjs/schematics:controller --name=companies --path=src/lib/modules/companies --sourceRoot=libs/account/feature/api --flat=true

ng generate @nestjs/schematics:service --name=companies --path=src/lib/modules/companies --sourceRoot=libs/account/feature/api --flat=true

typeorm entity:create --dir libs/account/feature/api/src/lib/entities --name company
```

## Account Feature Lazy Company

```bash
ng generate @nrwl/angular:library --name=company --style=scss --directory=account/feature/lazy --lazy --parentModule=apps/app/src/app/app.module.ts --routing --tags=feature:lazy

ng generate @schematics/angular:component --name=company --project=account-feature-lazy-company --style=scss --type=Container
```

## Account Feature Shared Forms

```bash
ng generate @nrwl/angular:library --name=forms --style=scss --directory=account/feature/shared --prefix=wws-form --tags=feature:shared

ng generate @schematics/angular:component --name=users/create-user --project=account-feature-shared-forms --style=scss --export --type=Form

ng generate @schematics/angular:component --name=companies/create-company --project=account-feature-shared-forms --style=scss --export --type=Form
```

<!-- This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@wws/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more. -->
