import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { State } from '../../reducers'
import { selectIsLoggenIn } from '../../Store/login-store/login.selector'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  isLoggedIn: Observable<boolean>

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isLoggedIn = this.store.select(selectIsLoggenIn)
    // this.currentApplicationVersion = environment.version;
    // this.loggedIn$ = this.store.select(selectIsLoggiedIn);
  }
}
