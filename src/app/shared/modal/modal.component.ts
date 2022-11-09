import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() display: boolean
  @Input() modalTitle: string
  @Input() width: string
  @Input() height: string

  @Input() deleteAction: boolean = false

  @Output() closed = new EventEmitter<boolean>()
  @ContentChild('footer') footer: TemplateRef<any>

  @Input() fullMode: boolean = false
  constructor() {}

  ngOnInit(): void {}
  close() {
    this.closed.emit(true)
    this.display = false
  }
}
