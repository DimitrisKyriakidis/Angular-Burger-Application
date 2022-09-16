import { createReducer, on } from '@ngrx/store'
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
} from './burger-actions'
import { initialBurgersState } from './burger.state'

export const burgerReducer = createReducer(
  initialBurgersState,

  on(getAllBurgersSuccess, (state, action) => {
    let allBurgers = action['payload']
    let deluxeBurgers = []
    let simpleBurgers = []
    let cheeseBurger = []

    for (let burger of allBurgers) {
      switch (burger['category']) {
        case 'DeluxeBurger':
          deluxeBurgers.push(burger)
          break
        case 'SimpleBurger':
          simpleBurgers.push(burger)
          break
        case 'CheeseBurger':
          cheeseBurger.push(burger)
          break
        default:
          false
      }
    }
    return {
      ...state,
      burgers: { deluxeBurgers, simpleBurgers, cheeseBurger },
      loading: false,
    }
  }),
  on(createBurger, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(createBurgerSuccess, (state, action) => ({
    ...state,
    loading: true,
  })),
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
    let products = []
    products = [...state.cart.products]
    let foundIndex = products.findIndex(
      (product) => product.id === action.payload.id,
    )
    console.log('foundIndex==', foundIndex)
    console.log('productsFOundId==', products[foundIndex])

    if (foundIndex !== -1) {
      products[foundIndex] = {
        id: action.payload.id,
        category: action.payload.category,
        iconUrl: action.payload.iconUrl,
        description: action.payload.description,
        price:
          products[foundIndex].price *
          (products[foundIndex].quantity + action.payload.quantity),
        quantity: products[foundIndex].quantity += action.payload.quantity,
      }
    } else {
      products.push({
        ...action.payload,
        quantity: action.payload.quantity,
        //  price: action.payload.price * action.payload.quantity,
      })
    }

    console.log('products==', products)
    console.log('action==', action)

    let totalCartItems = 0
    let totalPrice = 0

    for (let product of products) {
      totalCartItems += product.quantity
      totalPrice += product.price * product.quantity
    }
    console.log('priceTotal==', totalPrice)

    console.log('total==', totalCartItems)

    return {
      ...state,

      loading: false,
      cart: {
        totalPrice: totalPrice,
        totalCartItems: totalCartItems,
        products: products,
      },
    }
  }),
)
