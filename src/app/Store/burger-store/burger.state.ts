export interface BurgersState {
  burgers: {}
  burgerID: string
  cart: {
    totalPrice: number
    totalCartItems: number
    products?: any[]
  }
}
export const initialBurgersState: BurgersState = {
  burgers: {},
  burgerID: '',
  cart: {
    totalPrice: 0,
    totalCartItems: 0,
    products: [],
  },
}
