import { createReducer, on } from "@ngrx/store";

import { User } from "../../auth/model/user.model";
import { createBurger,editBurger ,createBurgerSuccess, deleteBurger, getAllBurgers, getAllBurgersSuccess, setBurgerToState, editBurgerSuccess } from "./burger-actions";
import { initialBurgersState } from "./burger.state";



export const burgerReducer = createReducer(
    initialBurgersState,
   
    on(getAllBurgersSuccess, (state, action) => {
        let allBurgers = action['payload']
        let deluxeBurgers = []
        let simpleBurgers = []
        let cheeseBurger = []

        for (let burger of allBurgers) {
            switch (burger['category']) {
                case 'DeluxeBurger':
                    deluxeBurgers.push(burger)
                    break;
                case 'SimpleBurger':
                    simpleBurgers.push(burger)
                    break;
                case 'CheeseBurger':
                    cheeseBurger.push(burger)
                    break;
                default: false
            }

        }
        return {

            ...state,
            burgers: { deluxeBurgers, simpleBurgers, cheeseBurger },
            loading: false

        }
    }),
    on(createBurger, (state, action) => ({
        ...state,
        loading: true

    })),
    on(createBurgerSuccess, (state, action) => ({
        ...state,
        loading: true

    })),
 on(createBurger, (state, action) => ({
        ...state,
        loading: true

    })),
    on(createBurgerSuccess, (state, action) => ({
        ...state,
        loading: false

    })),
    on(editBurger, (state, action) => ({
        ...state,
        loading: true

    })),
    on(editBurgerSuccess, (state, {burgerID}) => ({
        ...state,
        burgerID:burgerID,
        loading: false

    })),
    on(deleteBurger, (state,action) => ({
        ...state,
        loading: false

    })),
  
  
)