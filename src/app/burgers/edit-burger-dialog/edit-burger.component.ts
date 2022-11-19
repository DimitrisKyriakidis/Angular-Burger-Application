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

@Component({
  selector: 'burger-dialog',
  templateUrl: './edit-burger.component.html',
  styleUrls: ['./edit-burger.component.css'],
})
export class EditBurgerComponent implements OnInit {
  ingredientsForm: FormGroup

  dialogTitle: string
  submitted: boolean = false

  commentForm: FormGroup

  vegetables: any[] = []

  editMode: boolean = false
  createMode: boolean = false
  burgerId: string

  loading$: Observable<boolean>

  ingredients = ingredientsData

  /*
  //array of chips of 
 */

  vegetableChips: any[] = []

  breadCheeseMeatChips: any[] = []

  /*
 //overall progress at percentages(%) of the current order
 */
  orderStatusScore: number = 0

  /*
 to count how many times each category control has been checked(helper for create the order status)
 */
  breadValueChangeCounter: number = 0
  meatValueChangeCounter: number = 0
  cheeseValueChangeCounter: number = 0
  vegetablesValueChangeCounter: number = 0

  /*
  to set the selected radio button when edit the form
 */
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
    this.editMode = this.data.dialogData['update']
    this.createMode = this.data.dialogData['create']

    this.initForm()

    if (this.editMode) {
      this.editForm()
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
      cheese: new FormControl(null),
    })

    this.commentForm = new FormGroup({
      comment: new FormControl(null, {
        validators: [Validators.required],
      }),
    })
    this.ingredients.Vegetables = this.ingredients.Vegetables.map((veg) => {
      return { ...veg, selected: false }
    })
  }

  editForm() {
    this.orderStatusScore = this.data.dialogData.burger.progress

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
          break
        case 'cheese':
          const activeCheese = ing
          this.cheese.patchValue(activeCheese)
          this.selectedCheese = activeCheese.name
          break
        case 'meat':
          const activeMeat = ing
          this.meat.patchValue(activeMeat)
          this.selectedMeat = activeMeat.name
          break
        default:
          false
      }
    }
    this.commentForm.patchValue({
      comment: this.data.dialogData.burger?.comment,
    })
  }

  onRadioChange(event) {
    this.radioButtonsChipsHandler(event)
    console.log(event)

    if (
      event.value.category === 'bread' &&
      this.breadValueChangeCounter === 0 &&
      this.orderStatusScore < 100
    ) {
      this.breadValueChangeCounter++
      this.orderStatusScore += 25
    }
    if (
      event.value.category === 'meat' &&
      this.meatValueChangeCounter === 0 &&
      this.orderStatusScore < 100
    ) {
      this.meatValueChangeCounter++
      this.orderStatusScore += 25
    }
    if (
      event.value.category === 'cheese' &&
      this.cheeseValueChangeCounter === 0 &&
      this.orderStatusScore < 100
    ) {
      this.cheeseValueChangeCounter++
      this.orderStatusScore += 25
    }
  }

  /* 
  update the chips value when new value selected 
  */
  radioButtonsChipsHandler(event) {
    this.ingredientsForm.valueChanges.subscribe((item) => {
      const index = this.breadCheeseMeatChips.indexOf(event.value.name)
      this.breadCheeseMeatChips?.splice(index, 1)

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
    })
  }

  onVegetablesChange(event) {
    this.vegetables = event._value
    this.countOrderStatusVegetablesTab()

    if (event) {
      this.vegetables = this.vegetables.map((value) => {
        if (value.selected === false) {
          return { ...value, selected: true }
        }
        return value
      })

      this.vegetableChips = this.vegetables.map((veg) => {
        return veg.name
      })
    } else {
      this.vegetables.splice(this.vegetables.indexOf(event.value), 1)
    }
  }

  countOrderStatusVegetablesTab() {
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
  }

  onSave() {
    this.submitted = true
    this.ingredientsForm.value.vegetables = this.vegetables
    let formValues = {
      ...this.ingredientsForm.value,
      ...this.commentForm.value,
      progress: this.orderStatusScore,
    }

    if (this.ingredientsForm.valid) {
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
      this.onClose()
      this.submitted = false
    }
  }
  onClose() {
    this.dialogRef.close()
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
}
