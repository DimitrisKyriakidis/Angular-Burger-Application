import { Component, Inject, Input, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Burgers } from "../../../models/burger";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs";
import { BurgerService } from "../../../services/burger.service";
import { Store } from "@ngrx/store";
import { State } from "../../../reducers";
import { ActionBurgerTypes } from "../../../Store/burger-store/burger-actions";
import { ingredientsData } from "../../../shared/ingredientsData";
import { element } from "protractor";

@Component({
  selector: "burger-dialog",
  templateUrl: "./edit-burger.component.html",
  styleUrls: ["./edit-burger.component.css"],
})
export class EditBurgerComponent implements OnInit {
  form: FormGroup;
  burgers: any;
  dialogTitle: string;
  submitted: boolean;

  editMode: false;
  createMode: false;
  burgerID: string;
  description: string;
  iconUrl: string;
  category: string;
  loading$: Observable<boolean>;

  ingredients = ingredientsData;

  vegetableChips: any[] = [];
  breadCheeseMeatChips: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditBurgerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private burgerService: BurgerService,
    private store: Store<State>,
    private fb: FormBuilder
  ) {
    this.burgerID = data.dialogData.id;
    this.description = data.dialogData.description;
    this.category = data.dialogData.category;
    this.iconUrl = data.dialogData.iconUrl;
  }

  ngOnInit() {
    console.log(this.ingredients);
    this.initForm();
    this.editMode = this.data.dialogData["update"];
    this.createMode = this.data.dialogData["create"];

    // this.form = new FormGroup({
    //   description: new FormControl(null, {
    //     validators: [Validators.required],
    //   }),
    //   category: new FormControl(null, {
    //     validators: [Validators.required],
    //   }),
    //   iconUrl: new FormControl(null, {
    //     validators: [Validators.required],
    //   }),
    // })
    // if (this.editMode) {
    //   this.form.patchValue({
    //     description: this.data.dialogData['description'],
    //     category: this.data.dialogData['category'],
    //     iconUrl: this.data.dialogData['iconUrl'],
    //   })
    // } else {
    //   this.form.patchValue({
    //     description: this.data.dialogData['description'],
    //     category: this.data.dialogData['category'],
    //     iconUrl: this.data.dialogData['iconUrl'],
    //   })
    // }
  }

  initForm() {
    this.form = this.fb.group({
      bread: new FormControl(null, {
        validators: [Validators.required],
      }),
      meat: new FormControl(null, {
        validators: [Validators.required],
      }),
      cheese: new FormControl(null, {
        validators: [Validators.required],
      }),
      vegetables: this.fb.array([]),
    });

    console.log("bread==", this.bread);

    console.log("Meat==", this.meat);

    // this.ingredients.Vegetables.forEach((element) => {
    //   this.vegetables.push(
    //     this.fb.group({
    //       name: element.name,
    //       price: element.price,
    //       quantity: element.quantity,
    //       icon:element.icon
    //     }),
    //   )
    // })
    console.log("vegetables==", this.vegetables);
  }

  get bread() {
    return this.form.get("bread");
  }

  get meat(): FormArray {
    return <FormArray>this.form.get("meat");
  }

  get vegetables(): FormArray {
    return <FormArray>this.form.get("vegetables");
  }
  onClose() {
    this.dialogRef.close();
  }

  onRadioChange(event) {
    if (event) {
      this.breadCheeseMeatChips.push(event.value.name);
    }
    console.log("radioArrays==", this.breadCheeseMeatChips);
  }

  onVegetablesChange(event, index) {
    if (event.checked) {
      this.vegetables.push(new FormControl(event.source.value));
      this.vegetableChips = this.vegetables.value.map((veg) => {
        return veg.name;
      });
    } else {
      this.vegetables.removeAt(index);
      this.onVegetableChipsRemoved(index);
    }
    console.log("event==", event);
    console.log("vegetables==", this.vegetables);
  }

  onSave() {
    console.log("formValue", this.form.value);
    this.store.dispatch({
      type: ActionBurgerTypes.createBurger,
      burger: this.form.value,
    });
    this.onClose(); 
    // if (this.createMode) {
    //   this.store.dispatch({
    //     type: ActionBurgerTypes.createBurger,
    //     iconUrl: this.form.value.iconUrl,
    //     description: this.form.value.description,
    //     category: this.form.value.category,
    //   })
    //   this.dialogRef.close()
    // } else {
    //   this.store.dispatch({
    //     type: ActionBurgerTypes.editBurger,
    //     id: this.burgerID,
    //     iconUrl: this.form.value.iconUrl,
    //     description: this.form.value.description,
    //     category: this.form.value.category,
    //   })
    //   this.dialogRef.close()
    // }
  }

  onBreadCheeseMeatChipsRemoved(index) {
    this.removeFirst(this.breadCheeseMeatChips, index);
    // this.form.setValue(toppings) // To trigger change detection
  }
  onVegetableChipsRemoved(index) {
    this.removeFirst(this.vegetableChips, index);
    // this.form.setValue(toppings) // To trigger change detection
  }

  private removeFirst<T>(array: T[], index: number): void {
    //const index = array.indexOf(toRemove);
    array.splice(index, 1);
  }
}
