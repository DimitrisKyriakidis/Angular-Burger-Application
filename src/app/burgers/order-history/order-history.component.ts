import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { State } from '../../reducers'
import {
  ActionBurgerTypes,
  setActivePage,
} from '../../Store/burger-store/burger-actions'
import { selectHistoryOrdersData } from '../../Store/burger-store/burger.selector'

@Component({
  selector: 'order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OrderHistoryComponent implements OnInit {
  historyOrders$: Observable<any[]>

  selectedOrdersForDelete: any[] = []

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(setActivePage({ activePage: 'orderHistory' }))
    this.store.dispatch({ type: ActionBurgerTypes.getAllHistoryOrders })
    this.historyOrders$ = this.store.select(selectHistoryOrdersData)

    this.historyOrders$.subscribe((data) => {
      if (data) {
        console.log(data)
      }
    })
  }
  onSelectOrdersForDelete(event) {
    console.log(event)

    if (event.checked) {
      this.selectedOrdersForDelete.push(event.source.value)
    } else {
      const index = this.selectedOrdersForDelete.indexOf(event.source.value)
      this.selectedOrdersForDelete.splice(index, 1)
    }
    console.log(this.selectedOrdersForDelete)
  }

  deleteHistoryOrders() {}
}
