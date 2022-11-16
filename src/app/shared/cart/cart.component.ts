import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core'

import { Store } from '@ngrx/store'

import { Observable } from 'rxjs'
import { State } from '../../reducers'
import { ActionBurgerTypes } from '../../Store/burger-store/burger-actions'
import {
  selectCartTotalPrice,
  selectLoading,
  selectTotalCartItems,
} from '../../Store/burger-store/burger.selector'

@Component({
  selector: 'shopping-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  productList$: Observable<any[]>

  totalPrice$: Observable<number>

  totalCartItems$: Observable<number>

  isShoppingCartOpen: boolean = false

  loading$: Observable<boolean>

  @Output()
  openShoppingCartModal = new EventEmitter<boolean>()

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    // const storageValue = JSON.parse(localStorage.getItem('cart'))
    // console.log('storageValue=', storageValue)
    // this.productList = storageValue
    // console.log('productList=', this.productList)

    this.productList$ = this.store.select((state) => state.burger.cart.products)
    this.totalPrice$ = this.store.select(selectCartTotalPrice)
    this.totalCartItems$ = this.store.select(selectTotalCartItems)
    this.loading$ = this.store.select(selectLoading)
  }

  decreaseQuantity(id) {
    this.dispatchRemoveAction(id, true)
  }

  increaseQuantity(burger) {
    this.store.dispatch({
      type: ActionBurgerTypes.addBurgerToCart,
      payload: burger,
      increaseOnlyQuantity: true,
    })
  }

  removeBurgerFromCart(id) {
    this.dispatchRemoveAction(id, false)
  }

  dispatchRemoveAction(id: string, decreaseOnlyQuantity: boolean) {
    this.store.dispatch({
      type: ActionBurgerTypes.removeBurgerFromCart,
      id: id,
      decreaseOnlyQuantity: decreaseOnlyQuantity,
    })
  }

  sendOrderToHistory(cartData, totalPrice) {
    console.log(totalPrice)

    console.log('cartData=', cartData)
    const cartOrderIds = cartData.map((data) => data.id)
    this.store.dispatch({
      type: ActionBurgerTypes.sendOrderTohistory,
      shoppingCartData: cartData,
      totalPrice: totalPrice,
    })
    console.log(cartOrderIds)
    this.isShoppingCartOpen = false
  }

  openShoppingCart() {
    this.isShoppingCartOpen = true
    this.openShoppingCartModal.emit(this.isShoppingCartOpen)
  }
}
