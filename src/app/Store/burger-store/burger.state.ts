export interface BurgersState {
  burgers: any[]
  loading: boolean
  burgerID: string
  cart: {
    products?: any[]
  }
}
export const initialBurgersState: BurgersState = {
  burgers: [],
  loading: false,
  burgerID: '',
  cart: {
    products: [],
  },
}
