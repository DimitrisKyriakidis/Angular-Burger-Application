import { Component, Input, OnInit } from '@angular/core'

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
  images: any[] = [
    {
      imageSrc:
        'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
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
  ]

  constructor() {}

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
}
