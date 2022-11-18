import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { EditBurgerComponent } from '../../burgers/edit-burger-dialog/edit-burger.component'
import { carouselImages } from '../models/carouselPhotos'
import { defaultDialogConfig } from '../models/default-dialog-config'

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  selectedIndex: number = 0

  @Input() indicators: boolean = true
  @Input() autoSlide: boolean = false
  @Input() slideInderval: number = 3000

  @Input()
  images: any[] = carouselImages

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImages()
    }
  }
  autoSlideImages() {
    setInterval(() => {
      this.changeImages()
    }, this.slideInderval)
  }

  changeImages() {
    for (let i = 0; i < this.images.length; i++) {
      if (this.selectedIndex === this.images.length - 1) {
        this.selectedIndex = 0
      }
      this.selectedIndex++
    }
  }
  createOrder() {
    this.dialogInfo({ dialogTitle: '', create: true }, EditBurgerComponent)
  }
  dialogInfo(dialogData: any, Component) {
    const dialogConfig = defaultDialogConfig()
    dialogConfig.data = { dialogData }
    this.dialog.open(Component, dialogConfig)
  }
}
