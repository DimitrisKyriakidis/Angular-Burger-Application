import { createFeatureSelector, createSelector } from '@ngrx/store'
import { BurgersState } from './burger.state'

export const burgerState = createFeatureSelector<BurgersState>('burger')
export const selectBurger = createSelector(
  burgerState,
  (state) => state.burgers
)

export const selectLoading = createSelector(
  burgerState,
  (state) => state.loading
)

export const selectBurgerID = createSelector(
  burgerState,
  (state) => state.burgerID
)

export const selectTotalCartItems = createSelector(
  burgerState,
  (state) => state.cart.products.length
  // state.cart.products.reduce((acc, product) => {
  //   return acc + product.quantity
  // }, 0)
)

export const selectCartTotalPrice = createSelector(burgerState, (state) =>
  state.cart.products.reduce((acc, product) => {
    return acc + product.orderPrice * product.quantity
  }, 0)
)

export const selectHistoryOrdersData = createSelector(
  burgerState,
  (state) => state.historyOrdersData
)

export const selectThemeColor = createSelector(
  burgerState,
  (state) => state.color
)
