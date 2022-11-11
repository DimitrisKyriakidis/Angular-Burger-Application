import { NgModule } from '@angular/core'
import { AngularMaterialModule } from './angular-material.module'

import { CommonModule } from '@angular/common'
import { NavBarComponent } from '../nav-bar/nav-bar.component'
import { CarouselComponent } from '../carousel/carousel.component'
import { ModalComponent } from '../modal/modal.component'
import { CartComponent } from '../cart/cart.component'
import { FooterComponent } from '../footer/footer.component'

@NgModule({
  declarations: [
    NavBarComponent,
    CarouselComponent,
    ModalComponent,
    CartComponent,
    FooterComponent,
  ],
  imports: [AngularMaterialModule, CommonModule],
  exports: [
    NavBarComponent,
    CarouselComponent,
    ModalComponent,
    CartComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
