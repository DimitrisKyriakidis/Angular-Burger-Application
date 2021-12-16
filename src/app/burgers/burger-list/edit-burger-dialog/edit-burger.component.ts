import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Burgers } from '../../../models/burger';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BurgerService, } from '../../../services/burger.service';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { ActionBurgerTypes } from '../../../Store/burger-store/burger-actions';


@Component({
  selector: 'burger-dialog',
  templateUrl: './edit-burger.component.html',
  styleUrls: ['./edit-burger.component.css'],

})
export class EditBurgerComponent implements OnInit {

  form: FormGroup;
  burgers: any
  dialogTitle: string;
  submitted: boolean
  burger: Burgers;
 

  editMode: false
  createMode: false
  burgerID: string
  description: string
  iconUrl: string
  category: string
  loading$: Observable<boolean>;

  constructor(
    private dialogRef: MatDialogRef<EditBurgerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private burgerService: BurgerService, private store: Store<State>) {
    this.burgerID = data.id
    this.description = data.description
    this.category = data.category
    this.iconUrl = data.iconUrl

  }

  ngOnInit() {
    this.editMode = this.data['update']
    this.createMode = this.data['create']

    this.form = new FormGroup({
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      category: new FormControl(null, {
        validators: [Validators.required]
      }),
      iconUrl: new FormControl(null, {
        validators: [Validators.required]
      }),

    });
    if (this.editMode) {
      this.form.patchValue({
        description: this.data['description'],
        category: this.data['category'],
        iconUrl: this.data['iconUrl']
      })
    } else {
      this.form.patchValue({
        description: this.data['description'],
        category: this.data['category'],
        iconUrl: this.data['iconUrl']
      })
    }
  }


  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.createMode) {
      this.store.dispatch({
        type: ActionBurgerTypes.createBurger,
        iconUrl: this.form.value.iconUrl,
        description: this.form.value.description,
        category: this.form.value.category,
      })
      this.dialogRef.close();
    }
    else {
      this.store.dispatch({
        type: ActionBurgerTypes.editBurger,
        id: this.burgerID,
        iconUrl: this.form.value.iconUrl,
        description: this.form.value.description,
        category: this.form.value.category,
      })
      this.dialogRef.close();
    }
  }

}
