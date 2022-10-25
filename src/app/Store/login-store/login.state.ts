import { User } from '../../shared/models/user.model'

export interface LoginState {
  user: User
  isLoggedIn: boolean
}
export const initialLoginState: LoginState = {
  user: null,
  isLoggedIn: false,
}
