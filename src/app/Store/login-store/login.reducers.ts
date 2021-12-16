import { createReducer, on } from "@ngrx/store";
import {  loginSuccess } from "./login.actions";
import { initialLoginState } from "./login.state";


export const loginReducer = createReducer(
    initialLoginState,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            isLoggedIn: true,
            user: action.user
        };
    })





)