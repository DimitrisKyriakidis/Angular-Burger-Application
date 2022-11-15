import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { State } from '../../reducers'

import { logout } from '../../Store/login-store/login.actions'
import { selectIsLoggenIn } from '../../Store/login-store/login.selector'
import { ActionBurgerTypes } from '../../Store/burger-store/burger-actions'
import { debounceTime } from 'rxjs/operators'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isLoggedIn: Observable<boolean>

  checkOpenCart: boolean = false

  searchByName = new FormControl(null)

  searchTerm = null

  debounceTime: number = 1000

  constructor(
    private router: Router,
    private store: Store<State>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.isLoggedIn = this.authService.isLoggedIn$
    this.isLoggedIn = this.store.select(selectIsLoggenIn)
    this.isLoggedIn.subscribe((data) => {
      console.log('isLoggenIn=', data)
    })

    this.searchByName?.valueChanges
      .pipe(debounceTime(this.debounceTime))
      .subscribe((res) => {
        this.searchTerm = res
        this.store.dispatch({
          type: ActionBurgerTypes.getAllBurgers,
          searchString: this.searchTerm,
        })
      })
  }

  onOpenCart(event: boolean) {
    this.checkOpenCart = event
  }

  logout() {
    this.store.dispatch(logout())
  }
  navigateOrderHistory() {
    this.router.navigate(['/order-history'])
  }
}
