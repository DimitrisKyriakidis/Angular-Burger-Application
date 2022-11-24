import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
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
  setThemeColor,
} from '../../Store/burger-store/burger-actions'
import { debounceTime } from 'rxjs/operators'
import { FormControl } from '@angular/forms'

import { Location } from '@angular/common'
import { Color } from '../models/color'

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

  activeColor: string

  @Output()
  changeTheme = new EventEmitter<Color>()

  themes: any[] = [
    { id: 1, name: 'orange', color: '#ee7727' },
    { id: 2, name: 'blue', color: '#0459a9' },
    { id: 3, name: 'green', color: '#066619' },
  ]

  constructor(
    private router: Router,
    private store: Store<State>,
    private authService: AuthService,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn
    // this.isLoggedIn = this.store.select(selectIsLoggenIn)
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

  setThemeColor(color: Color) {
    this.store.dispatch(setThemeColor({ color }))
    this.changeTheme.emit(color)
    this.activeColor = color.color
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
