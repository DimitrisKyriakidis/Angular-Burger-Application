import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'

import { Observable } from 'rxjs'

import { Store } from '@ngrx/store'
import { State } from '../reducers'

import { AuthService } from '../services/auth.service'

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
      this.authService.checkExpiration()
    }
  }
}
