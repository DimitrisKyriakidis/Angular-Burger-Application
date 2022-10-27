import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { Observable } from 'rxjs'
import { BurgerService } from '../../services/burger.service'

import { ActionBurgerTypes } from '../../Store/burger-store/burger-actions'
import { ingredientsData } from '../../shared/models/ingredientsData'
import { Store } from '@ngrx/store'
import { State } from '../../reducers'

@Component({
  selector: 'burger-dialog',
  templateUrl: './edit-burger.component.html',
  styleUrls: ['./edit-burger.component.css'],
})
export class EditBurgerComponent implements OnInit {
  ingredientsForm: FormGroup
  burgers: any
  dialogTitle: string
  submitted: boolean

  commentForm: FormGroup

  editMode: false
  createMode: false
  burgerID: string
  description: string
  iconUrl: string
  category: string
  loading$: Observable<boolean>

  ingredients = ingredientsData

  vegetableChips: any[] = [] //array of chips with vegetables,form array controls values

  breadCheeseMeatChips: any[] = [] //array of chips with bread,cheese and meat controls values

  orderStatusScore: number = 0 //overall progress at percentages(%) of the current order

  breadValueChangeCounter: number = 0 //to count how many times the category bread control has been checked
  meatValueChangeCounter: number = 0 //to count how many times the category meat control has been checked
  cheeseValueChangeCounter: number = 0 //to count how many times the category cheese control has been checked
  vegetablesValueChangeCounter: number = 0 //to count how many times the category vegetables controls has been checked

  constructor(
    private dialogRef: MatDialogRef<EditBurgerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private burgerService: BurgerService,
    private store: Store<State>,
    private fb: FormBuilder
  ) {
    this.burgerID = data.dialogData.id
    this.description = data.dialogData.description
    this.category = data.dialogData.category
    this.iconUrl = data.dialogData.iconUrl
  }

  ngOnInit() {
    console.log(this.ingredients)
    this.initForm()
    this.editMode = this.data.dialogData['update']
    this.createMode = this.data.dialogData['create']

    console.log('editMode==', this.editMode)

    console.log('createMode==', this.createMode)

    if (this.editMode) {
      console.log('dataForEdit==', this.data)
      // this.ingredientsForm.patchValue({
      //   BrownBread: 'BrownBread',
      // })

      let activeIngredients = this.data.dialogData.burger.ingredients
      let activeVegetables = []
      let activeBread = {}

      for (let ing of activeIngredients) {
        switch (ing.category) {
          case 'vegetables':
            activeVegetables.push(ing)
            break
          case 'bread':
            activeBread = ing
            //  this.activeBread={
            //   name:"WhiteBread"
            //  }
            //   this.ingredientsForm.patchValue({
            //     bread: this.activeBread,
            //   })
            break
          default:
            false
        }
      }
      console.log('activeBread==', activeBread)

      console.log('activeVegetables=', activeVegetables)
    }

    //else {
    //   this.form.patchValue({
    //     description: this.data.dialogData['description'],
    //     category: this.data.dialogData['category'],
    //     iconUrl: this.data.dialogData['iconUrl'],
    //   })
    // }
  }

  initForm() {
    this.ingredientsForm = this.fb.group({
      bread: new FormControl(null, {
        validators: [Validators.required],
      }),
      // bread: this.fb.array([this.creadBreadControls()]),
      meat: new FormControl(null, {
        validators: [Validators.required],
      }),
      cheese: new FormControl(null, {
        validators: [Validators.required],
      }),
      vegetables: this.fb.array([]),
    })

    this.commentForm = new FormGroup({
      comment: new FormControl(null, {
        validators: [Validators.required],
      }),
    })
    // this.currentFormStatus = Object.keys(this.form.value).every(
    //   (k) => !!this.form.value[k]
    // )

    console.log('bread==', this.bread)

    console.log('Meat==', this.meat)

    // this.ingredients.Vegetables.forEach((element) => {
    //   this.vegetables.push(
    //     this.fb.group({
    //       name: element.name,
    //       price: element.price,
    //       quantity: element.quantity,
    //       icon: element.icon,
    //     })
    //   )
    // })
    //let breadForm = {}
    // this.ingredients.Bun.forEach((element) => {
    //   this.ingredientsForm.addControl(element.name, this.fb.control(null))
    //   // breadForm[element.name] = new FormControl(null)
    // })
    // console.log('breadForm', breadForm)

    console.log('form value==', this.ingredientsForm)
    console.log('vegetables==', this.vegetables)
  }

  get bread() {
    return this.ingredientsForm.get('bread')
  }

  // creadBreadControls() {
  //   this.fb.group({
  //     WhiteBread: [],
  //     BrownBread: [],
  //   })
  // }
  // get bread(): FormArray {
  //   return (<FormArray>this.ingredientsForm.get('bread')) as FormArray
  // }

  get meat() {
    return this.ingredientsForm.get('meat')
  }

  get cheese() {
    return this.ingredientsForm.get('cheese')
  }

  get vegetables(): FormArray {
    return (<FormArray>this.ingredientsForm.get('vegetables')) as FormArray
  }
  onClose() {
    this.dialogRef.close()
  }

  onRadioChange(event) {
    console.log(event)
    if (event) {
      this.breadCheeseMeatChips.push(event.value.name)
    }
    if (
      event.value.category === 'bread' &&
      this.breadValueChangeCounter === 0
    ) {
      this.breadValueChangeCounter++
      this.orderStatusScore += 25
      console.log('currentStatus', this.orderStatusScore)
    }
    if (event.value.category === 'meat' && this.meatValueChangeCounter === 0) {
      this.meatValueChangeCounter++
      this.orderStatusScore += 25
      console.log('currentStatus', this.orderStatusScore)
    }
    if (
      event.value.category === 'cheese' &&
      this.cheeseValueChangeCounter === 0
    ) {
      this.cheeseValueChangeCounter++
      this.orderStatusScore += 25
      console.log('currentStatus', this.orderStatusScore)
    }

    //console.log('radioArrays==', this.breadCheeseMeatChips)
  }
  checkedValues = []
  onVegetablesChange(event, index: number) {
    let controls: any = {}
    if (
      this.vegetablesValueChangeCounter === 0 &&
      this.vegetables.value.length >= 0
    ) {
      this.vegetablesValueChangeCounter++
      this.orderStatusScore += 25
    }

    if (event.checked) {
      console.log('event==', event)
      //checkedValues.push(event.source.value.name)

      // this.checkedValues = [...this.checkedValues, event.source.value.name]
      // this.checkedValues.push(event.source.value.name.toLowerCase())
      // this.checkedValues.forEach((key) => {
      //   controls[key] = new FormControl(event.source.value)
      // })

      // this.vegetables.controls = controls
      // this.vegetables.value.push(event.source.value)
      // console.log('controls==', controls)

      // console.log('checkedValues==', this.checkedValues)

      this.vegetables.push(new FormControl(event.source.value))
      // this.vegetables.push({
      //   ...event.source.value.name:new FormControl(event.source.value)
      // })

      // this.vegetables.controls.push(event.source.value)

      // this.vegetables.controls.forEach((element)=>{
      // controls[event.source.value.name] =
      // })
      // console.log('VEGETABLES=', this.vegetables)

      // let createFormArray = Object.keys(this.vegetables).forEach((key) => {
      //   console.log('kkey==', key)
      // })
      // this.vegetables.push(
      //   this.fb.group({
      //     controls[event.source.value.name]: new FormControl(event.source.value)
      //   })
      // );

      this.vegetableChips = this.vegetables.value.map((veg) => {
        return veg.name
      })
    } else {
      this.vegetables.removeAt(index)
      this.onVegetableChipsRemoved(index)
    }
    console.log('event==', event)
    console.log('vegetables==', this.vegetables)
  }

  onSave() {
    let formValues = {
      ...this.ingredientsForm.value,
      ...this.commentForm.value,
    }
    console.log('formValues==', formValues)

    console.log('ingredientsFormValues==', this.ingredientsForm.value)
    this.store.dispatch({
      type: ActionBurgerTypes.createBurger,
      burger: formValues,
    })
    // this.onClose()
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

  onBreadCheeseMeatChipsRemoved(index: number) {
    this.removeFirst(this.breadCheeseMeatChips, index)
    // this.form.setValue(toppings) // To trigger change detection
  }
  onVegetableChipsRemoved(index: number) {
    this.removeFirst(this.vegetableChips, index)
    // this.form.setValue(toppings) // To trigger change detection
  }

  private removeFirst<T>(array: T[], index: number): void {
    //const index = array.indexOf(toRemove);
    array.splice(index, 1)
  }
}
