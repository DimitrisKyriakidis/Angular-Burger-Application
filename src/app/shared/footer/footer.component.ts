import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { State } from '../../reducers'
import { AuthService } from '../../services/auth.service'
import { selectIsLoggenIn } from '../../Store/login-store/login.selector'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  isLoggedIn: Observable<boolean>

  constructor(private store: Store<State>, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn
    //this.isLoggedIn = this.store.select(selectIsLoggenIn)
  }
}
