import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { burgerReducer } from "../Store/burger-store/burger.reducers";
import { BurgersState } from "../Store/burger-store/burger.state";
import { loginReducer } from "../Store/login-store/login.reducers";
import { LoginState } from "../Store/login-store/login.state";

export interface State{
    login:LoginState
    burger:BurgersState

}
export const reducers:ActionReducerMap<State>={
login:loginReducer,
burger:burgerReducer
};
