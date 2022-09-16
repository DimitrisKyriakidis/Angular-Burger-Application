import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loading = true
  totalCartItems: Observable<number>
  productList:Observable<any[]>
  totalPrice:Observable<number>

  constructor(private router: Router, private store: Store<State>) {}

  ngOnInit() {
    this.totalCartItems = this.store.select(
      (state) => state.burger.cart.totalCartItems,
    )
    this.productList=this.store.select((state)=>state.burger.cart.products)

   this.totalPrice=this.store.select((state)=>state.burger.cart.totalPrice)

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

  logout() {
    this.store.dispatch(logout())
  }
}
