import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { State } from '../../../reducers'
import { ActionBurgerTypes } from '../../../Store/burger-store/burger-actions'

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartForm: FormGroup
  icon: string

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CartComponent>,
    private store: Store<State>,
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.icon = this.data.dialogData.iconUrl
  }

  initForm() {
    this.cartForm = new FormGroup({
      quantity: new FormControl(null, {
        validators: [Validators.required],
      }),
    })
  }
  closeDialog() {
    this.dialogRef.close()
  }
  add() {
    this.data.dialogData.quantity = this.cartForm.value.quantity //add quantity value to the object
    this.store.dispatch({
      type: ActionBurgerTypes.addBurgerToCart,
      payload: this.data.dialogData,
    })
    this.closeDialog()
  }
}
