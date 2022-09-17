export interface BurgersState {
  burgers: {}
  burgerID: string
  cart: {
    products?: any[]
  }
}
export const initialBurgersState: BurgersState = {
  burgers: {},
  burgerID: '',
  cart: {
    products: [],
  },
}
