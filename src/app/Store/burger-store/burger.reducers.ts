import { ActionReducer, createReducer, INIT, on, UPDATE } from '@ngrx/store'
import { element } from 'protractor'

import { User } from '../../auth/model/user.model'
import {
  createBurger,
  editBurger,
  createBurgerSuccess,
  deleteBurger,
  getAllBurgers,
  getAllBurgersSuccess,
  setBurgerToState,
  editBurgerSuccess,
  addBurgerToCart,
  removeBurgerFromCart,
} from './burger-actions'
import { initialBurgersState } from './burger.state'

export const burgerReducer = createReducer(
  initialBurgersState,

  on(getAllBurgersSuccess, (state, { burgers }) => {
    // let allBurgers = action['burgers']
    // let deluxeBurgers = []
    // let simpleBurgers = []
    // let cheeseBurger = []

    // for (let burger of allBurgers) {
    //   switch (burger['category']) {
    //     case 'DeluxeBurger':
    //       deluxeBurgers.push(burger)
    //       break
    //     case 'SimpleBurger':
    //       simpleBurgers.push(burger)
    //       break
    //     case 'CheeseBurger':
    //       cheeseBurger.push(burger)
    //       break
    //     default:
    //       false
    //   }
    // }
    return {
      ...state,
      burgers: burgers,
      loading: false,
    }
  }),
  on(createBurger, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(createBurgerSuccess, (state, action) => ({
    ...state,
    loading: false,
  })),

  on(editBurger, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(editBurgerSuccess, (state, { burgerID }) => ({
    ...state,
    burgerID: burgerID,
    loading: false,
  })),
  on(deleteBurger, (state, action) => ({
    ...state,
    loading: false,
  })),
  on(addBurgerToCart, (state, action) => {
    let products: any = []
    products = [...state.cart.products]

    let foundIndex = products.findIndex(
      (product) => product.id === action.payload.id
    )

    if (foundIndex !== -1) {
      products[foundIndex] = {
        id: action.payload.id,
        category: action.payload.category,
        iconUrl: action.payload.iconUrl,
        description: action.payload.description,
        price: products[foundIndex].price,
        quantity: (products[foundIndex].quantity += action.payload.quantity),
      }
    } else {
      products.push({
        ...action.payload,
        quantity: action.payload.quantity,
        price: action.payload.price,
      })
    }

    return {
      ...state,
      loading: false,
      cart: {
        products: products,
      },
    }
  }),

  on(removeBurgerFromCart, (state: any, action) => {
    let products = []
    products = [...state.cart.products]
    const foundIndex = products.findIndex((product) => product.id === action.id)

    for (let product of products) {
      if (product.id === action.id) {
        product.quantity -= 1
      }
      if (product.quantity === 0) {
        products.splice(foundIndex, 1)
      }
    }

    /* second solution
    let foundIndex = products.findIndex((product) => product.id === action.id);
    products[foundIndex].quantity -= 1;
    */

    return {
      ...state,
      loading: false,
      cart: {
        products: products,
      },
    }
  })
)

export const metaReducerLocalStorage = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    if (action.type === INIT || action.type == UPDATE) {
      const storageValue = localStorage.getItem('state')
      if (storageValue) {
        try {
          return JSON.parse(storageValue)
        } catch {
          localStorage.removeItem('state')
        }
      }
    }

    const nextState = reducer(state, action)
    localStorage.setItem('state', JSON.stringify(nextState))
    return nextState
  }
}
