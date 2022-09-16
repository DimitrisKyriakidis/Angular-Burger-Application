import { createFeatureSelector, createSelector } from '@ngrx/store'
import { BurgersState } from './burger.state'

export const burgerState = createFeatureSelector<BurgersState>('burger')
export const selectBurger = createSelector(
  burgerState,
  (state) => state.burgers,
)

export const selectBurgerID = createSelector(
  burgerState,
  (state) => state.burgerID,
)
