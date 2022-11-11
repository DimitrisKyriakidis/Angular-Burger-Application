import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { State } from '../../reducers'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  currentApplicationVersion: string
  loggedIn$: Observable<boolean>

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    // this.currentApplicationVersion = environment.version;
    // this.loggedIn$ = this.store.select(selectIsLoggiedIn);
  }
}
