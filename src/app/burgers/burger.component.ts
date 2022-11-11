import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core'

import { MatDialog, MatDialogConfig } from '@angular/material/dialog'

import { BehaviorSubject, Observable, Subject } from 'rxjs'

import { Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BurgerService } from '../services/burger.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { AuthService } from '../services/auth.service'
import {
  ActionBurgerTypes,
  setLoader,
} from '../Store/burger-store/burger-actions'
import {
  selectBurger,
  selectLoading,
} from '../Store/burger-store/burger.selector'
import { EditBurgerComponent } from './edit-burger-dialog/edit-burger.component'
import { defaultDialogConfig } from '../shared/models/default-dialog-config'
import { Store } from '@ngrx/store'
import { State } from '../reducers'
import { ActionLoginTypes } from '../Store/login-store/login.actions'
import { debounceTime, take, timeout } from 'rxjs/operators'

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.css'],
})
export class BurgerComponent implements OnInit {
  matTabLabels = [
    { displayName: 'Burger', key: 'simpleBurgers' },
    { displayName: 'CheeseBurger', key: 'cheeseBurger' },
    { displayName: 'DeluxeBurger', key: 'deluxeBurgers' },
  ]

  cartForm: FormGroup

  burgers$: Observable<any[]>

  counter: number = 6

  deleteOrderModal: boolean = false

  burgerId: string

  public loading = new BehaviorSubject<boolean>(false)
  public loading$ = this.loading.asObservable()

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<State>,
    private burgerService: BurgerService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.checkExpiration()
      this.store.dispatch({ type: ActionLoginTypes.userLoggedIn })
    }

    this.store.dispatch({ type: ActionBurgerTypes.getAllBurgers })
    this.burgers$ = this.store.select(selectBurger)
    this.loading$ = this.store.select(selectLoading)

    this.burgers$.subscribe((data) => {
      console.log('burgerData==', data)
    })

    this.initCartForm()
  }

  initCartForm() {
    this.cartForm = new FormGroup({
      quantity: new FormControl(null, {
        validators: [Validators.required],
      }),
    })
  }
  showMore() {
    this.loading.next(true)

    setTimeout(() => {
      this.counter += 6
      this.loading.next(false)
    }, 500)
    //this.counter += 6
    console.log('counter==', this.counter)
  }

  showLess() {
    this.loading.next(true)

    setTimeout(() => {
      this.counter -= 6
      this.loading.next(false)
    }, 500)
    //this.counter -= 6
    console.log('counter==', this.counter)
  }
  onCreateBurger() {
    this.dialogInfo({ dialogTitle: '', create: true }, EditBurgerComponent)
  }

  onEditBurger(burger) {
    console.log('activeBurger==', burger)

    this.dialogInfo(
      {
        dialogTitle: '',
        update: true,
        id: burger.id,
        burger: burger,
      },
      EditBurgerComponent
    )
  }

  deleteBurger(id) {
    this.deleteOrderModal = true
    this.burgerId = id
  }
  onConfirmDelete() {
    this.store.dispatch({
      type: ActionBurgerTypes.deleteBurger,
      id: this.burgerId,
    })
    this.deleteOrderModal = false
  }

  addBurgerToCart(burger) {
    burger.quantity = this.cartForm.value.quantity //add quantity value to the object
    this.store.dispatch({
      type: ActionBurgerTypes.addBurgerToCart,
      payload: burger,
    })
    this.snackBar.open('Item added succesfully', 'X', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snackbarClass'],
    })
    this.cartForm.reset()
  }

  dialogInfo(dialogData: any, Component) {
    const dialogConfig = defaultDialogConfig()
    dialogConfig.data = { dialogData }
    this.dialog.open(Component, dialogConfig)
  }
}
