import { Component, OnDestroy, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router'
import { State } from './reducers'
import { logout } from './Store/login-store/login.actions'
import { ActionBurgerTypes } from './Store/burger-store/burger-actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loading = true

  productList: Observable<any[]>

  totalCartItems = 0

  totalPrice = 0

  subscription: Subscription

  constructor(private router: Router, private store: Store<State>) {}

  ngOnInit() {
    this.productList = this.store.select((state) => state.burger.cart.products)
    this.totalPriceAndQuantity()
    this.routerEvents()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  totalPriceAndQuantity() {
    this.subscription = this.productList.subscribe((response: any) => {
      this.totalCartItems = response.reduce((acc, item) => {
        return acc + item.quantity
      }, 0)
      this.totalPrice = response.reduce((acc, item) => {
        return acc + item.price * item.quantity
      }, 0)
      console.log('totalItems==', this.totalCartItems)
      console.log('totalPrice==', this.totalPrice)
    })
  }

  removeBurgerFromCart(id) {
    this.store.dispatch({
      type: ActionBurgerTypes.removeBurgerFromCart,
      id: id,
    })
  }
  logout() {
    this.store.dispatch(logout())
  }

  routerEvents() {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true
          break
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false
          break
        }
        default: {
          break
        }
      }
    })
  }
}
