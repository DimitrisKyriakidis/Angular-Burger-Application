import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { State } from './reducers'

import { AuthService } from './services/auth.service'
import { selectIsLoggenIn } from './Store/login-store/login.selector'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn: Observable<boolean>

  constructor(private authService: AuthService, private store: Store<State>) {}

  ngOnInit() {
    const scored = ['Lewandowski', 'Gnarbi', 'Ronaldo', 'Hummels']

    const odds = {
      team1: 1.33,
      x: 3.25,
      team2: 6.5,
    }

    // const average = Object.values(odds).reduce((acc, el) => {
    //   return acc + el / Object.values(odds).length
    // }, 0)
    // console.log(average)

    // let sum = 0
    // for (const val of Object.values(odds)) {
    //   sum += val / Object.values(odds).length
    // }
    // console.log(sum)

    //  Object.keys(odds).reduce((sum,el)=>{
    //    sum += el
    //  },0)

    // scored.forEach((item, index) => {
    //   console.log(`Goal ${index + 1}: ${item} `)
    // })
    // for (let [i, value] of scored.entries()) {
    //   //console.log(i, value)
    //   console.log(`Goal ${i + 1}: ${value}`)
    // }

    // console.log('app')
    // this.store.select(selectIsLoggenIn).subscribe((data) => {
    //   data = false
    // })
    // if (this.authService.isAuthenticated()) {
    //   this.authService.checkExpiration();
    // }
  }
}
