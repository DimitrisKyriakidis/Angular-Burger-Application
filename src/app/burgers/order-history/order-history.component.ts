import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { State } from '../../reducers'
import { ActionBurgerTypes } from '../../Store/burger-store/burger-actions'
import { selectHistoryOrdersData } from '../../Store/burger-store/burger.selector'

@Component({
  selector: 'order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  historyOrders$: Observable<any[]>

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch({ type: ActionBurgerTypes.getAllHistoryOrders })
    this.historyOrders$ = this.store.select(selectHistoryOrdersData)

    this.historyOrders$.subscribe((data) => {
      if (data) {
        console.log(data)
      }
    })
  }
}