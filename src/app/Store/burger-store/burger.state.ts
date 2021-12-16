import { User } from "../../auth/model/user.model";
import { Burgers } from "../../models/burger";

export interface BurgersState{
   
burgers:{},
burgerID:string
theBurger:Burgers[]
}
export const initialBurgersState:BurgersState={

burgers:{},
burgerID:'',
theBurger:[],


}