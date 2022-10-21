import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core'

import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { EditBurgerComponent } from './edit-burger-dialog/edit-burger.component'

import { select, Store } from '@ngrx/store'
import { State } from '../../reducers'
import { ActionBurgerTypes } from '../../Store/burger-store/burger-actions'
import {
  selectBurger,
  selectTotalCartItems,
} from '../../Store/burger-store/burger.selector'
import { Observable, Subject } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { filter } from '@angular-devkit/schematics'
import { defaultDialogConfig } from '../../shared/default-dialog-config'
import { Burgers } from '../../models/burger'
import { BurgerService } from '../../services/burger.service'
import { Router } from '@angular/router'
import { CartComponent } from '../shopping-cart/cart/cart.component'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { AuthService } from '../../auth/auth.service'
import { data } from 'autoprefixer'
import { element } from 'protractor'

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

  burgers: Observable<any[]>

  counter: number = 6

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
    }
    this.store.dispatch({ type: ActionBurgerTypes.getAllBurgers })
    this.burgers = this.store.select(selectBurger)
    this.burgers.subscribe((data) => {
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
    this.counter += 6
  }

  showLess() {
    this.counter -= 6
  }
  onCreateBurger() {
    this.dialogInfo({ dialogTitle: '', create: true }, EditBurgerComponent)
  }

  onEditBurger(burger) {
    this.dialogInfo(
      {
        dialogTitle: '',
        update: true,
        id: burger.id,
        description: burger.description,
        iconUrl: burger.iconUrl,
        category: burger.category,
      },
      EditBurgerComponent
    )
  }

  view(burger) {
    // this.router.navigate(['/burgers',burger.id])
  }

  onDeleteBurger(id) {
    this.store.dispatch({
      type: ActionBurgerTypes.deleteBurger,
      id: id,
    })
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
