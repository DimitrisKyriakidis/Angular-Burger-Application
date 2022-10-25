import { Component, OnDestroy, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router'
import { State } from './reducers'
import { logout } from './Store/login-store/login.actions'
import { ActionBurgerTypes } from './Store/burger-store/burger-actions'
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // if (this.authService.isAuthenticated()) {
    //   this.authService.checkExpiration();
    // }
  }
}
