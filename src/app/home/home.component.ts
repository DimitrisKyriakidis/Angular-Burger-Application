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
import { AuthService } from '../services/auth.service'
import { ActionLoginTypes } from '../Store/login-store/login.actions'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loading$: Observable<boolean>

  constructor(private store: Store<State>, private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.store.dispatch({ type: ActionLoginTypes.userLoggedIn })
    }
  }
}
