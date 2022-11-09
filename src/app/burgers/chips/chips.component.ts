import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
})
export class ChipsComponent implements OnInit {
  @Input()
  vegetableNameChips: any[] = []

  @Input()
  breadCheeseMeatNameChips: any[] = []

  constructor() {}

  ngOnInit(): void {}

  breadCheeseMeatChipsRemoved(index: number) {
    this.removeFirst(this.breadCheeseMeatNameChips, index)
  }
  vegetableChipsRemoved(index: number) {
    this.removeFirst(this.vegetableNameChips, index)
  }

  removeFirst<T>(array: T[], index: number): void {
    array.splice(index, 1)
  }
}
