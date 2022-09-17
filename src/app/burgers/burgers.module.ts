import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from '../home/home.component'
import { BurgerComponent } from './burger-list/burger.component'
import { EditBurgerComponent } from './burger-list/edit-burger-dialog/edit-burger.component'
import { BurgerService } from '../services/burger.service'

import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { ReactiveFormsModule } from '@angular/forms'
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule, Routes } from '@angular/router'

import { BurgerEffects } from '../Store/burger-store/burger-effects'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { burgerReducer } from '../Store/burger-store/burger.reducers'
import { CartComponent } from './shopping-cart/cart/cart.component'
import { MatSnackBarModule } from '@angular/material/snack-bar'

export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    StoreModule.forFeature('burger', burgerReducer),
    RouterModule.forChild(coursesRoutes),
    EffectsModule.forRoot([BurgerEffects]),
  ],
  declarations: [
    HomeComponent,
    BurgerComponent,
    EditBurgerComponent,
    CartComponent,
  ],
  exports: [HomeComponent, BurgerComponent, EditBurgerComponent],
  entryComponents: [EditBurgerComponent],
  providers: [BurgerService],
})
export class BurgersModule {
  static forRoot(): ModuleWithProviders<BurgersModule> {
    return {
      ngModule: BurgersModule,
      providers: [BurgerService],
    }
  }
}
