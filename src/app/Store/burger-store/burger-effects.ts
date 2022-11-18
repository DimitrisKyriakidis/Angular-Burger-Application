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
      mergeMap((payload) =>
        this.burgerService.getAllBurgers(payload['searchString']).pipe(
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
        this.burgerService.editBurger(payload['id'], payload['burger']).pipe(
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

  sendOrderToHistory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionBurgerTypes.sendOrderTohistory),
      mergeMap((payload) =>
        this.burgerService
          .sendOrderToHistory(
            payload['shoppingCartData'],
            payload['totalPrice']
          )
          .pipe(
            map((response) => {
              return {
                type: ActionBurgerTypes.sendOrderTohistorySuccess,
              }
            }),
            catchError(() => {
              return of({ type: ActionBurgerTypes.sendOrderTohistoryFail })
            })
          )
      )
    )
  })

  getAllHistoryOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionBurgerTypes.getAllHistoryOrders),
      mergeMap((payload) =>
        this.burgerService.getAllHistoryOrders(payload['searchString']).pipe(
          map((response) => {
            return {
              type: ActionBurgerTypes.getAllHistoryOrdersSuccess,
              historyOrdersData: response['data'],
            }
          }),
          catchError(() => {
            return of({ type: ActionBurgerTypes.getAllHistoryOrdersFail })
          })
        )
      )
    )
  })
  deleteHistoryOrdersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionBurgerTypes.deleteOrdersHistory),
      mergeMap((payload) =>
        this.burgerService.deleteHistoryOrders(payload['historyOrderIds']).pipe(
          map(() => {
            return { type: ActionBurgerTypes.getAllHistoryOrders }
          }),
          catchError(() => {
            return of({ type: ActionBurgerTypes.deleteOrdersHistoryFail })
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
