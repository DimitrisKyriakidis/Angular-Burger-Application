import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { State } from '../../reducers'

import { logout } from '../../Store/login-store/login.actions'
import { selectIsLoggenIn } from '../../Store/login-store/login.selector'
import {
  ActionBurgerTypes,
  setActivePage,
} from '../../Store/burger-store/burger-actions'
import { debounceTime } from 'rxjs/operators'
import { FormControl } from '@angular/forms'
import { selectActivePage } from '../../Store/burger-store/burger.selector'
import { Location } from '@angular/common'

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
  currentUrl: string

  searchPlaceholder = 'Search'

  constructor(
    private router: Router,
    private store: Store<State>,
    private authService: AuthService,
    public location: Location
  ) {}

  ngOnInit(): void {
    // this.isLoggedIn = this.authService.isLoggedIn$
    this.isLoggedIn = this.store.select(selectIsLoggenIn)
    this.isLoggedIn.subscribe((data) => {
      console.log('isLoggenIn=', data)
    })

    this.currentUrl = this.location.path()

    if (this.currentUrl.includes('burgers')) {
      this.searchByName?.valueChanges
        .pipe(debounceTime(this.debounceTime))
        .subscribe((res) => {
          this.searchTerm = res
          this.store.dispatch({
            type: ActionBurgerTypes.getAllBurgers,
            searchString: this.searchTerm,
          })
        })
    } else if (this.currentUrl.includes('order-history')) {
      this.searchByName?.valueChanges
        .pipe(debounceTime(this.debounceTime))
        .subscribe((res) => {
          this.searchTerm = res
          this.store.dispatch({
            type: ActionBurgerTypes.getAllHistoryOrders,
            searchString: this.searchTerm,
          })
        })
    } else {
      return
    }
  }

  onFocus(event) {
    if (event && this.currentUrl.includes('burgers')) {
      this.searchPlaceholder = 'Search by name'
    } else if (event && this.currentUrl.includes('order-history')) {
      this.searchPlaceholder = 'Search by order id'
    } else {
      this.searchPlaceholder = 'Search'
    }
  }
  onOpenCart(event: boolean) {
    this.checkOpenCart = event
  }

  navigateToMenu() {
    this.router.navigate(['/burgers']).then(() => {
      window.location.reload()
    })
  }

  navigateOrderHistory() {
    this.router.navigate(['/order-history']).then(() => {
      window.location.reload()
    })
  }
  logout() {
    this.store.dispatch(logout())
  }
}
