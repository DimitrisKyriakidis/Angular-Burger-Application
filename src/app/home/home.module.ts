import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { HttpClient } from '@angular/common/http'
import { HomeComponent } from './home.component'
import { AngularMaterialModule } from '../shared/modules/angular-material.module'
import { SharedModule } from '../shared/modules/shared.module'

const routes = [{ path: '', component: HomeComponent }]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [RouterModule],
})
export class HomePageModule {}
