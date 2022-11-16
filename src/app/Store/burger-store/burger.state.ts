export interface BurgersState {
  burgers: any[]
  loading: boolean
  burgerID: string
  cart: {
    products?: any[]
  }
  historyOrdersData?: any[]
  activePage: string
}
export const initialBurgersState: BurgersState = {
  burgers: [],
  loading: false,
  burgerID: '',
  cart: {
    products: [],
  },
  historyOrdersData: [],
  activePage: 'menu' || 'orderHistory',
}
