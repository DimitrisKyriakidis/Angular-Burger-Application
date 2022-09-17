import { createAction, props } from '@ngrx/store'
import { Burgers } from '../../models/burger'

export const enum ActionBurgerTypes {
  getAllBurgers = '[Burgers] get All',
  getAllBurgersSuccess = '[Burgers] get All Success',
  getAllBurgersFail = '[Burgers] get All Fail',

  createBurger = '[Burger] create burger',
  createBurgerSuccess = '[Burger] create burger Success',
  createBurgerFail = '[Burger] create burger Fail',

  editBurger = '[Burger] edit burger',
  editBurgerSuccess = '[Burger] edit burger Success',
  editBurgerFail = '[Burger] edit burger Fail',

  deleteBurger = '[Burger]  delete burger',
  deleteBurgerSuccess = '[Burger]  delete burger Success',
  deleteBurgerFail = '[Burger]  delete burger Fail',

  setBurgerToState = '[Burger] set burger to state',

  addBurgerToCart = '[Burger] add burger to cart',
  removeBurgerFromCart = '[Burger] remove burger from cart',
}
export const getAllBurgers = createAction(
  ActionBurgerTypes.getAllBurgers,
  props<{ burger: Burgers }>(),
)

export const getAllBurgersSuccess = createAction(
  ActionBurgerTypes.getAllBurgersSuccess,
  props<{ any }>(),
)

export const getAllBurgersFail = createAction(
  ActionBurgerTypes.getAllBurgersFail,
  props<{ error: string }>(),
)

export const createBurger = createAction(
  ActionBurgerTypes.createBurger,
  props<{ iconUrl: string; description: string; category: string }>(),
)

export const createBurgerSuccess = createAction(
  ActionBurgerTypes.createBurgerSuccess,
  props<{ any }>(),
)
export const createBurgerFail = createAction(
  ActionBurgerTypes.createBurgerSuccess,
  props<{ error: string }>(),
)

export const editBurger = createAction(
  ActionBurgerTypes.editBurger,
  props<{
    id: string
    iconUrl: string
    description: string
    category: string
  }>(),
)

export const editBurgerSuccess = createAction(
  ActionBurgerTypes.editBurgerSuccess,
  props<{ burgerID: string }>(),
)
export const editBurgerFail = createAction(
  ActionBurgerTypes.editBurgerFail,
  props<{ error: string }>(),
)

export const deleteBurger = createAction(
  ActionBurgerTypes.deleteBurger,
  props<{ id: number }>(),
)

export const deleteBurgerSuccess = createAction(
  ActionBurgerTypes.deleteBurgerSuccess,
  props<{ any }>(),
)
export const deleteBurgerFail = createAction(
  ActionBurgerTypes.deleteBurgerFail,
  props<{ error: string }>(),
)
export const setBurgerToState = createAction(
  ActionBurgerTypes.setBurgerToState,
  props<{ burger: Burgers }>(),
)

export const addBurgerToCart = createAction(
  ActionBurgerTypes.addBurgerToCart,
  props<{ payload: Burgers }>(),
)

export const removeBurgerFromCart = createAction(
  ActionBurgerTypes.removeBurgerFromCart,
  props<{ id: number }>(),
)
