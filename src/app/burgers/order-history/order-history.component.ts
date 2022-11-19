import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { State } from '../../reducers'
import { AuthService } from '../../services/auth.service'
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

  deleteHistoryModal: boolean = false

  constructor(private store: Store<State>, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.checkExpiration()
    }

    this.store.dispatch({ type: ActionBurgerTypes.getAllHistoryOrders })
    this.historyOrders$ = this.store.select(selectHistoryOrdersData)
  }
  onSelectOrdersForDelete(event) {
    if (event.checked) {
      this.selectedOrdersForDelete.push(event.source.value)
    } else {
      const index = this.selectedOrdersForDelete.indexOf(event.source.value)
      this.selectedOrdersForDelete.splice(index, 1)
    }
  }

  deleteHistoryOrders() {
    this.store.dispatch({
      type: ActionBurgerTypes.deleteOrdersHistory,
      historyOrderIds: this.selectedOrdersForDelete,
    })
    this.deleteHistoryModal = false
    this.selectedOrdersForDelete = []
  }
}
