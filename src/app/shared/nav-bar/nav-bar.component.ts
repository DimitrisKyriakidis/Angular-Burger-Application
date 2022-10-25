import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { State } from '../../reducers'
import { ActionBurgerTypes } from '../../Store/burger-store/burger-actions'
import {
  selectCartTotalPrice,
  selectTotalCartItems,
} from '../../Store/burger-store/burger.selector'
import { logout } from '../../Store/login-store/login.actions'

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  loading = true

  isLoggedIn: Observable<boolean>

  checkOpenCart: boolean = false

  constructor(
    private router: Router,
    private store: Store<State>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.store.select((state) => state.login.isLoggedIn)
  }

  onOpenCart(event: boolean) {
    this.checkOpenCart = event
  }

  logout() {
    this.store.dispatch(logout())
  }
}
