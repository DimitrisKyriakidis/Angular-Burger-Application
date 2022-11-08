import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { EditBurgerComponent } from '../../burgers/edit-burger-dialog/edit-burger.component'
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

  images: any[] = [
    {
      imageSrc:
        'https://www.missionburgers.com.au/themes/mission-burgers/assets/images/carousel/carousel4.jpg',
      imageAlt: 'person2',
    },

    {
      imageSrc: '../../../assets/carouselImages/banner4.png',
      imageAlt: 'person5',
    },
    {
      imageSrc: '../../../assets/carouselImages/banner2.png',
      imageAlt: 'nature2',
    },
    {
      imageSrc: '../../../assets/carouselImages/banner3.png',
      imageAlt: 'person1',
    },
    {
      imageSrc: 'https://images4.alphacoders.com/913/913175.jpg',
      imageAlt: 'person9',
    },
  ]

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
