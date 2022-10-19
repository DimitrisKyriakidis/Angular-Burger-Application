import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'

import { MatListModule } from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { HttpClientModule } from '@angular/common/http'

import { RouterModule, Routes } from '@angular/router'
import { AuthModule } from './auth/auth.module'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store'

import { EffectsModule } from '@ngrx/effects'
import { EntityDataModule } from '@ngrx/data'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { LoginEffects } from './Store/login-store/login.effects'
import { reducers } from './reducers'
import { BurgerEffects } from './Store/burger-store/burger-effects'
import { NavBarComponent } from './shared/nav-bar/nav-bar.component'
import { metaReducerLocalStorage } from './Store/burger-store/burger.reducers'
import { ModalComponent } from './shared/modal/modal.component'

const routes: Routes = [
  {
    path: 'burgers',
    loadChildren: () =>
      import('./burgers/burgers.module').then((m) => m.BurgersModule),
  },

  {
    path: '**',
    redirectTo: '/',
  },
]

@NgModule({
  declarations: [AppComponent, NavBarComponent, ModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    AuthModule.forRoot(),
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([LoginEffects]),
    StoreModule.forRoot(reducers, { metaReducers: [metaReducerLocalStorage] }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
