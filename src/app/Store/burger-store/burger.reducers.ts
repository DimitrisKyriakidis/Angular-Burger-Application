import { ActionReducer, createReducer, INIT, on, UPDATE } from '@ngrx/store'

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
  deleteBurgerSuccess,
  getAllHistoryOrders,
  getAllHistoryOrdersSuccess,
  sendOrderTohistory,
  sendOrderTohistorySuccess,
} from './burger-actions'
import { initialBurgersState } from './burger.state'

export const _burgerReducer = createReducer(
  initialBurgersState,

  on(getAllBurgers, (state, action) => {
    return {
      ...state,

      loading: true,
    }
  }),

  on(getAllBurgersSuccess, (state, { burgers }) => {
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
  on(editBurgerSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  /*delete from database and check if exists in the shopping cart.
  If exists remove it and update the cart 
  */
  on(deleteBurger, (state, { id }) => {
    const products = [...state.cart.products]
    products.forEach((prod, index) => {
      if (prod.id === id) {
        products.splice(index, 1)
      }
    })

    return {
      ...state,
      loading: true,
      cart: {
        products: products,
      },
    }
  }),

  /*
  add only to cart
  */
  on(addBurgerToCart, (state, action) => {
    const products = [...state.cart.products]

    const foundIndex = products.findIndex(
      (product) => product.id === action.payload.id
    )

    if (action.increaseOnlyQuantity) {
      products[foundIndex].quantity += 1
    }

    if (!action.increaseOnlyQuantity) {
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
    }

    //localStorage.setItem('cart', JSON.stringify(products))

    return {
      ...state,
      loading: false,
      cart: {
        products: products,
      },
    }
  }),

  /*
 remove only from cart
  */
  on(removeBurgerFromCart, (state: any, action) => {
    const products = [...state.cart.products]
    const foundIndex = products.findIndex((product) => product.id === action.id)

    for (let product of products) {
      if (product.id === action.id && action.decreaseOnlyQuantity) {
        product.quantity -= 1
      }
      if (product.quantity === 0 || !action.decreaseOnlyQuantity) {
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
  }),
  on(sendOrderTohistory, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(sendOrderTohistorySuccess, (state) => {
    return {
      ...state,
      loading: false,
      cart: {
        products: [],
      },
    }
  }),

  on(getAllHistoryOrders, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(getAllHistoryOrdersSuccess, (state, { historyOrdersData }) => {
    return {
      ...state,
      loading: false,
      historyOrdersData: historyOrdersData,
    }
  })
)

export function burgerReducer(state, action) {
  return _burgerReducer(state, action)
}

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
