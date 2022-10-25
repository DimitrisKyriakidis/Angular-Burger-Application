import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from '../home/home.component'

import { EditBurgerComponent } from './edit-burger-dialog/edit-burger.component'
import { BurgerService } from '../services/burger.service'

import { RouterModule, Routes } from '@angular/router'

import { AngularMaterialModule } from '../shared/modules/angular-material.module'
import { SharedModule } from '../shared/modules/shared.module'
import { BurgerComponent } from './burger.component'

const routes = [{ path: '', component: BurgerComponent }]

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [BurgerComponent, EditBurgerComponent],
  exports: [BurgerComponent, EditBurgerComponent],

  providers: [BurgerService],
})
export class BurgersModule {}
