import { createAction, props } from "@ngrx/store";
import { User } from "../../auth/model/user.model";


export const enum ActionLoginTypes {
  loginAction = '[Login] login user',
  loginSuccess = '[Login] login user Success',
  loginFail = '[Login] login user fail',
 logout='[User] logout',
 redirectDone='redirect page'
}


export const login=createAction(
    ActionLoginTypes.loginAction,
    props<{email:string;password:string}>()

);


export const loginSuccess=createAction(
    ActionLoginTypes.loginSuccess,
    props<{user:User;}>()

);

export const loginFail=createAction(
    ActionLoginTypes.loginFail,
    props<{error:string}>()

);
export const logout=createAction(
    ActionLoginTypes.logout,
   

);