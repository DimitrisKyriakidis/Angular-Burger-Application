import { createAction, props } from '@ngrx/store'
import { Burgers } from '../../shared/models/burger'

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

  sendOrderTohistory = '[Burger] sendOrderTohistory ',
  sendOrderTohistorySuccess = '[Burger] sendOrderTohistory Success',
  sendOrderTohistoryFail = '[Burger] sendOrderTohistory Fail',

  getAllHistoryOrders = '[Burger] getAllHistoryOrders ',
  getAllHistoryOrdersSuccess = '[Burger] getAllHistoryOrders Success',
  getAllHistoryOrdersFail = '[Burger] getAllHistoryOrders Fail',

  setActivePage = '[Burger] active page ',
}
export const getAllBurgers = createAction(
  ActionBurgerTypes.getAllBurgers,
  props<{ searchString: string }>()
)

export const getAllBurgersSuccess = createAction(
  ActionBurgerTypes.getAllBurgersSuccess,
  props<{ burgers: any[] }>()
)

export const getAllBurgersFail = createAction(
  ActionBurgerTypes.getAllBurgersFail,
  props<{ error: string }>()
)

export const createBurger = createAction(
  ActionBurgerTypes.createBurger,
  props<{ burger: any }>()
)

export const createBurgerSuccess = createAction(
  ActionBurgerTypes.createBurgerSuccess,
  props<{ any }>()
)
export const createBurgerFail = createAction(
  ActionBurgerTypes.createBurgerSuccess,
  props<{ error: string }>()
)

export const editBurger = createAction(
  ActionBurgerTypes.editBurger,
  props<{
    id: string
    burger: any
  }>()
)

export const editBurgerSuccess = createAction(
  ActionBurgerTypes.editBurgerSuccess
)
export const editBurgerFail = createAction(
  ActionBurgerTypes.editBurgerFail,
  props<{ error: string }>()
)

export const deleteBurger = createAction(
  ActionBurgerTypes.deleteBurger,
  props<{ id: string }>()
)

export const deleteBurgerSuccess = createAction(
  ActionBurgerTypes.deleteBurgerSuccess,
  props<{ any }>()
)
export const deleteBurgerFail = createAction(
  ActionBurgerTypes.deleteBurgerFail,
  props<{ error: string }>()
)
export const setBurgerToState = createAction(
  ActionBurgerTypes.setBurgerToState,
  props<{ burger: Burgers }>()
)

export const addBurgerToCart = createAction(
  ActionBurgerTypes.addBurgerToCart,
  props<{ payload: Burgers; increaseOnlyQuantity: boolean }>()
)

export const removeBurgerFromCart = createAction(
  ActionBurgerTypes.removeBurgerFromCart,
  props<{ id: string; decreaseOnlyQuantity: boolean }>()
)

export const sendOrderTohistory = createAction(
  ActionBurgerTypes.sendOrderTohistory,
  props<{ shoppingCartData: []; totalPrice: number }>()
)

export const sendOrderTohistorySuccess = createAction(
  ActionBurgerTypes.sendOrderTohistorySuccess
)

export const sendOrderTohistoryFail = createAction(
  ActionBurgerTypes.sendOrderTohistoryFail,
  props<{ error: string }>()
)

export const getAllHistoryOrders = createAction(
  ActionBurgerTypes.getAllHistoryOrders
)

export const getAllHistoryOrdersSuccess = createAction(
  ActionBurgerTypes.getAllHistoryOrdersSuccess,
  props<{ historyOrdersData: any[] }>()
)

export const getAllHistoryOrdersFail = createAction(
  ActionBurgerTypes.getAllHistoryOrdersFail,
  props<{ error: string }>()
)

export const setActivePage = createAction(
  ActionBurgerTypes.setActivePage,
  props<{ activePage: string }>()
)
