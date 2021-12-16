import { User } from "../../auth/model/user.model";

export interface LoginState{
    user:User
    isLoggedIn:boolean
}
export const initialLoginState:LoginState={
user:null,
isLoggedIn:false
}