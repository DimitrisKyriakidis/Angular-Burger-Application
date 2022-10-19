import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs'
import { AuthService } from '../../auth/auth.service'
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
export class NavBarComponent implements OnInit, OnDestroy {
  loading = true

  productList: Observable<any[]>

  isLoggedIn: Observable<boolean>

  totalCartItems: Observable<number>

  totalPrice: Observable<number>

  isShoppingCartOpen: boolean = false

  subscription: Subscription
  constructor(
    private router: Router,
    private store: Store<State>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.store.select((state) => state.login.isLoggedIn)

    this.productList = this.store.select((state) => state.burger.cart.products)

    this.totalCartItems = this.store.select(selectTotalCartItems)
    this.totalPrice = this.store.select(selectCartTotalPrice)
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  removeBurgerFromCart(id) {
    this.store.dispatch({
      type: ActionBurgerTypes.removeBurgerFromCart,
      id: id,
    })
  }
  openShoppingCart() {
    this.isShoppingCartOpen = true
  }
  logout() {
    this.store.dispatch(logout())
  }
}
