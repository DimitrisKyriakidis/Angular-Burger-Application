import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
})
export class ChipsComponent implements OnInit {
  @Input()
  vegetableNameChips: string[] = []

  @Input()
  breadCheeseMeatNameChips: string[] = []

  @Output()
  deletedChip = new EventEmitter<string>()

  constructor() {}

  ngOnInit(): void {}

  breadCheeseMeatChipsRemoved(index: number) {
    this.deletedChip.emit(this.breadCheeseMeatNameChips[index])
  }
  vegetableChipsRemoved(index: number) {
    this.removeFirst(this.vegetableNameChips, index)
  }

  removeFirst(array: string[], index: number): void {
    array.splice(index, 1)
  }
}
