import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { LoginComponent } from './login.component'
import { AuthService } from '../services/auth.service'

import { AngularMaterialModule } from '../shared/modules/angular-material.module'
import { SharedModule } from '../shared/modules/shared.module'

export const routes = [
  {
    path: '',
    component: LoginComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LoginComponent],
  exports: [RouterModule],
  entryComponents: [],
  providers: [AuthService],
})
export class LoginModule {}
