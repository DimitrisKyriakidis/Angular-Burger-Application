import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { AuthService } from '../../services/auth.service'
import { Burgers } from '../../shared/models/burger'
import { BurgerService } from '../../services/burger.service'
import { ActionBurgerTypes } from './burger-actions'

@Injectable()
export class BurgerEffects {
  getAllBurgersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionBurgerTypes.getAllBurgers),
      mergeMap(() =>
        this.burgerService.getAllBurgers().pipe(
          map((response) => {
            return {
              type: ActionBurgerTypes.getAllBurgersSuccess,
              burgers: response['data'],
            }
          }),
          catchError(() => {
            return of({ type: ActionBurgerTypes.getAllBurgersFail })
          })
        )
      )
    )
  })

  createBurgersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionBurgerTypes.createBurger),
      mergeMap((payload) =>
        this.burgerService.saveBurger(payload).pipe(
          map(() => {
            this.router.navigate(['/burgers'])
            return { type: ActionBurgerTypes.getAllBurgers }
          }),
          catchError(() => {
            return of({ type: ActionBurgerTypes.createBurgerFail })
          })
        )
      )
    )
  })

  editBurgersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionBurgerTypes.editBurger),
      mergeMap((payload) =>
        this.burgerService
          .editBurger(
            payload['id'],
            payload['iconUrl'],
            payload['description'],
            payload['category']
          )
          .pipe(
            map((response) => {
              console.log(response)

              return { type: ActionBurgerTypes.getAllBurgers }
            }),
            catchError(() => {
              return of({ type: ActionBurgerTypes.editBurgerFail })
            })
          )
      )
    )
  })

  deleteBurgersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionBurgerTypes.deleteBurger),
      mergeMap((payload) =>
        this.burgerService.deleteBurger(payload['id']).pipe(
          map(() => {
            return { type: ActionBurgerTypes.getAllBurgers }
          }),
          catchError(() => {
            return of({ type: ActionBurgerTypes.deleteBurgerFail })
          })
        )
      )
    )
  })

  constructor(
    private burgerService: BurgerService,
    private actions$: Actions,
    private router: Router
  ) {}
}
