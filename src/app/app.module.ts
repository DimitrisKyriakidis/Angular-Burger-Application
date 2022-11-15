import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { HttpClientModule } from '@angular/common/http'

import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'

import { EffectsModule } from '@ngrx/effects'

import { LoginEffects } from './Store/login-store/login.effects'

import { BurgerEffects } from './Store/burger-store/burger-effects'

import { SharedModule } from './shared/modules/shared.module'

import { reducers } from './reducers'
import { AppRoutingModule } from './routing/app-routing.module'
import { LoginModule } from './login/login.module'
import { BurgersModule } from './burgers/burgers.module'
import { metaReducerLocalStorage } from './Store/burger-store/burger.reducers'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    LoginModule,
    BurgersModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([LoginEffects, BurgerEffects]),
    StoreModule.forRoot(reducers, { metaReducers: [metaReducerLocalStorage] }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
