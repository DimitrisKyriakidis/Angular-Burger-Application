import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { Burgers } from '../shared/models/burger'
import { Observable } from 'rxjs'

import { EditBurgerComponent } from '../burgers/edit-burger-dialog/edit-burger.component'
import { MatDialog } from '@angular/material/dialog'
import { map, shareReplay, tap } from 'rxjs/operators'
import { BurgerService } from '../services/burger.service'
import { Store } from '@ngrx/store'
import { State } from '../reducers'
import { getAllBurgers } from '../../../server/get-courses.route'
import { ActionBurgerTypes } from '../Store/burger-store/burger-actions'
import { selectBurger } from '../Store/burger-store/burger.selector'
import { defaultDialogConfig } from '../shared/models/default-dialog-config'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>

  loading$: Observable<boolean>

  burgers: Observable<any[]>

  constructor(
    private dialog: MatDialog,
    private burgerService: BurgerService,
    private store: Store<State>
  ) {}

  ngOnInit() {}

  reload() {}

  editCourse(course: Burgers) {
    const dialogConfig = defaultDialogConfig()

    dialogConfig.data = {
      dialogTitle: 'Edit Course',
      course,
      mode: 'update',
    }
  }

  onDeleteCourse(course: Burgers) {}
}
