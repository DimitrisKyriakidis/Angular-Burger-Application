import { Color } from '../../shared/models/color'

export interface BurgersState {
  burgers: any[]
  loading: boolean
  burgerID: string
  cart: {
    products?: any[]
  }
  historyOrdersData?: any[]
  color: Color
}
export const initialBurgersState: BurgersState = {
  burgers: [],
  loading: false,
  burgerID: '',
  cart: {
    products: [],
  },
  historyOrdersData: [],
  color: {},
}
