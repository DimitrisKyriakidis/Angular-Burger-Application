import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EditBurgerComponent } from "./edit-burger-dialog/edit-burger.component";

import { select, Store } from '@ngrx/store';
import { State } from '../../reducers';
import { ActionBurgerTypes } from '../../Store/burger-store/burger-actions';
import { selectBurger, selectBurgerElements } from '../../Store/burger-store/burger.selector';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { filter } from '@angular-devkit/schematics';
import { defaultDialogConfig } from '../../shared/default-dialog-config';
import { Burgers } from '../../models/burger';
import { BurgerService } from '../../services/burger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.css'],

})
export class BurgerComponent implements OnInit {
  matTabLabels = [
    { displayName: 'Burger', key: 'simpleBurgers' },
    { displayName: 'CheeseBurger', key: 'cheeseBurger' },
    { displayName: 'DeluxeBurger', key: 'deluxeBurgers' }
  ];

  @Input()
  burgers: Observable<{}>;




  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<State>,
    private burgerService: BurgerService) {
  }
 
  ngOnInit() {

    this.store.dispatch({ type: ActionBurgerTypes.getAllBurgers })
    this.burgers = this.store.select(selectBurger)
  }


  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "",
      create: true
    };
    this.dialog.open(EditBurgerComponent, dialogConfig);
  }

  onEditBurger(burger) {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "",
      update: true,
      id: burger.id,
      description: burger.description,
      iconUrl: burger.iconUrl,
      category: burger.category,
    };
   
    this.dialog.open(EditBurgerComponent, dialogConfig);


  }

  view(burger) {
    // this.router.navigate(['/burgers',burger.id])
  }
  onDeleteBurger(id) {
    this.store.dispatch({
      type: ActionBurgerTypes.deleteBurger,
      id: id
    })
  }

}








