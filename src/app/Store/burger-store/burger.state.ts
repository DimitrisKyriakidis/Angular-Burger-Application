export interface BurgersState {
  burgers: any[]
  burgerID: string
  cart: {
    products?: any[]
  }
}
export const initialBurgersState: BurgersState = {
  burgers: [],
  burgerID: '',
  cart: {
    products: [],
  },
}
