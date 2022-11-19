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
    // console.log('app')
    // this.store.select(selectIsLoggenIn).subscribe((data) => {
    //   data = false
    // })
    // if (this.authService.isAuthenticated()) {
    //   this.authService.checkExpiration();
    // }
  }
}
