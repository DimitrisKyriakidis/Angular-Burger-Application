import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AuthService } from "../../auth/auth.service";
import { ActionLoginTypes } from "./login.actions";

@Injectable()
export class LoginEffects {


    loginEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ActionLoginTypes.loginAction),
            mergeMap((payload: { email: string; password: string; }) =>
                this.authService.login(payload.email, payload.password).pipe(
                    map((data: any) => {
                        if (data) {
                            this.router.navigateByUrl('burgers')
                            const user = this.authService.formatUser(data);
                            this.authService.setUserInLocalStorage(user);
                            return { type: ActionLoginTypes.loginSuccess, user };
                        }
                    }),
                    catchError(() => {
                        return of({ type: ActionLoginTypes.loginFail });
                    })
                )
            )

        );

    })



    logoutffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ActionLoginTypes.logout),
            mergeMap((payload) =>
                of(true).pipe(
                    map(() => {
                        this.authService.logout()
                        localStorage.clear()
                        this.router.navigate(['/'])
                        return { type: ActionLoginTypes.redirectDone };
                    }),
                    catchError(() => {
                        return of({ type: ActionLoginTypes.loginFail });
                    })
                )
            )

        );

    })










    constructor(private authService: AuthService, private actions$: Actions, private router: Router) { }
}





