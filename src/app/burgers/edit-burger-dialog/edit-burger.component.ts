import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core'
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
import { threadId } from 'worker_threads'

@Component({
  selector: 'burger-dialog',
  templateUrl: './edit-burger.component.html',
  styleUrls: ['./edit-burger.component.css'],
})
export class EditBurgerComponent implements OnInit {
  ingredientsForm: FormGroup
  burgers: any
  dialogTitle: string
  submitted: boolean = false

  commentForm: FormGroup

  editMode: false
  createMode: false
  burgerId: string
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

  vegetables: any[] = []

  selectedBread: string
  selectedCheese: string
  selectedMeat: string
  constructor(
    private dialogRef: MatDialogRef<EditBurgerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private burgerService: BurgerService,
    private store: Store<State>,
    private fb: FormBuilder
  ) {
    this.burgerId = data.dialogData.burger?.id
  }

  ngOnInit() {
    console.log(this.ingredients)
    this.initForm()
    //  this.addCheckboxes()

    this.editMode = this.data.dialogData['update']
    this.createMode = this.data.dialogData['create']

    console.log('editMode==', this.editMode)

    console.log('createMode==', this.createMode)

    if (this.editMode) {
      console.log('dataForEdit==', this.data)
      this.orderStatusScore = this.data.dialogData.burger.status

      let activeIngredients = this.data.dialogData.burger.ingredients

      for (let ing of activeIngredients) {
        const activeVegetables = []
        switch (ing.category) {
          case 'vegetables':
            activeVegetables.push(ing)
            for (let data of activeVegetables) {
              this.ingredients.Vegetables = this.ingredients.Vegetables.map(
                (veg) => {
                  if (veg.name === data.name) {
                    return { ...veg, selected: true }
                  }
                  return veg
                }
              )
            }
            break
          case 'bread':
            const activeBread = ing
            this.bread.patchValue(activeBread)
            this.selectedBread = activeBread.name

            // this.bread.patchValue(activeBread.name)
            break
          case 'cheese':
            const activeCheese = ing
            this.cheese.patchValue(activeCheese)
            console.log('activeChesse', activeCheese)

            this.selectedCheese = activeCheese.name
            // this.selectedValue.trim()
            console.log('TYPE', typeof this.selectedCheese)

            console.log('selectedCheeseVal==', this.selectedCheese)
            console.log('selectedCheeseValTrim==', this.selectedCheese)

            // this.cheese.patchValue(activeCheese.name)
            break
          case 'meat':
            const activeMeat = ing
            this.meat.patchValue(activeMeat)
            this.selectedMeat = activeMeat.name
            //this.meat.patchValue(activeMeat.name)
            break
          default:
            false
        }
      }
      this.commentForm.patchValue({
        comment: this.data.dialogData.burger?.comment,
      })
    }
  }

  initForm() {
    this.ingredientsForm = this.fb.group({
      bread: new FormControl(null, {
        validators: [Validators.required],
      }),

      meat: new FormControl(null, {
        validators: [Validators.required],
      }),
      cheese: new FormControl(null, {
        validators: [Validators.required],
      }),
      //   vegetables: this.fb.array([]),
    })

    this.commentForm = new FormGroup({
      comment: new FormControl(null, {
        validators: [Validators.required],
      }),
    })
    this.ingredients.Vegetables = this.ingredients.Vegetables.map((veg) => {
      return { ...veg, selected: false }
    })

    console.log('bread==', this.bread)

    console.log('Meat==', this.meat)

    console.log('form value==', this.ingredientsForm)
    console.log('vegetables==', this.vegetables)
  }

  get bread() {
    return this.ingredientsForm.get('bread')
  }

  get meat() {
    return this.ingredientsForm.get('meat')
  }

  get cheese() {
    return this.ingredientsForm.get('cheese')
  }

  // get vegetables(): FormArray {
  //   return (<FormArray>this.ingredientsForm.get('vegetables')) as FormArray
  // }
  onClose() {
    this.dialogRef.close()
  }

  onRadioChange(event) {
    console.log('form value2==', this.ingredientsForm)

    console.log(event)

    this.ingredientsForm.valueChanges.subscribe((item) => {
      console.log('changeVal=', item)

      this.breadCheeseMeatChips?.splice(
        this.breadCheeseMeatChips.indexOf(event.value.name),
        1
      )

      this.breadCheeseMeatChips.push(
        item.bread?.name,
        item.cheese?.name,
        item.meat?.name
      )
      const filtered = this.breadCheeseMeatChips.filter(
        (val) => val !== undefined
      )

      this.breadCheeseMeatChips = filtered

      this.breadCheeseMeatChips = [...new Set(this.breadCheeseMeatChips)] //use Set to keep unique values and remove duplicates

      console.log('breadMeatChips', this.breadCheeseMeatChips)
    })

    if (
      event.value.category === 'bread' &&
      this.breadValueChangeCounter === 0 &&
      this.orderStatusScore < 100
    ) {
      this.breadValueChangeCounter++
      this.orderStatusScore += 25

      console.log('currentStatus', this.orderStatusScore)
    }
    if (
      event.value.category === 'meat' &&
      this.meatValueChangeCounter === 0 &&
      this.orderStatusScore < 100
    ) {
      this.meatValueChangeCounter++
      this.orderStatusScore += 25
      console.log('currentStatus', this.orderStatusScore)
    }
    if (
      event.value.category === 'cheese' &&
      this.cheeseValueChangeCounter === 0 &&
      this.orderStatusScore < 100
    ) {
      this.cheeseValueChangeCounter++
      this.orderStatusScore += 25
      console.log('currentStatus', this.orderStatusScore)
    }
  }

  onVegetablesChange(event, index: number) {
    console.log('list event==', event)
    // if (this.orderStatusScore >= 100) {
    //   this.orderStatusScore = 100
    // }
    this.vegetables = event._value
    if (this.editMode) {
      if (
        this.vegetablesValueChangeCounter === 0 &&
        this.vegetables.length >= 0 &&
        this.orderStatusScore < 100
      ) {
        this.vegetablesValueChangeCounter++
        this.orderStatusScore += 25
      } else if (
        this.vegetablesValueChangeCounter === 1 &&
        this.orderStatusScore < 75
      ) {
        this.orderStatusScore -= 25
      } else if (
        this.orderStatusScore === 100 &&
        this.vegetables.length === 0
      ) {
        this.orderStatusScore = 75
      } else if (this.orderStatusScore === 75 && this.vegetables.length > 0) {
        this.orderStatusScore = 100
      }
    } else if (
      this.vegetablesValueChangeCounter === 0 &&
      this.vegetables.length >= 0 &&
      this.orderStatusScore < 100
    ) {
      this.vegetablesValueChangeCounter++
      this.orderStatusScore += 25
    } else if (this.vegetables.length === 0) {
      this.orderStatusScore -= 25
    } else if (
      this.vegetables.length === 1 &&
      this.vegetablesValueChangeCounter === 1 &&
      this.orderStatusScore < 100
    ) {
      this.orderStatusScore += 25
    }

    if (event) {
      this.vegetables = this.vegetables.map((value) => {
        if (value.selected === false) {
          return { ...value, selected: true }
        }
        return value
      })
      console.log('selectedVegetables==', this.vegetables)

      this.vegetableChips = this.vegetables.map((veg) => {
        return veg.name
      })
    } else {
      this.vegetables.splice(this.vegetables.indexOf(event.value), 1)
      // this.vegetables.removeAt(index)
      this.onVegetableChipsRemoved(index)
    }

    console.log('vegetables==', this.vegetables)
  }

  onSave() {
    this.ingredientsForm.value.vegetables = this.vegetables
    let formValues = {
      ...this.ingredientsForm.value,
      ...this.commentForm.value,
      status: this.orderStatusScore,
    }
    console.log('formValues==', formValues)

    console.log('ingredientsFormValues==', this.ingredientsForm.value)
    // this.store.dispatch({
    //   type: ActionBurgerTypes.createBurger,
    //   burger: formValues,
    // })
    // this.onClose()
    if (this.editMode) {
      this.store.dispatch({
        type: ActionBurgerTypes.editBurger,
        id: this.burgerId,
        burger: formValues,
      })
    } else {
      this.store.dispatch({
        type: ActionBurgerTypes.createBurger,
        burger: formValues,
      })
    }
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
