import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'

import { State } from '../reducers'
import { Store } from '@ngrx/store'
import { ActionLoginTypes } from '../Store/login-store/login.actions'

@Injectable()
export class AuthService {
  private isLoggedIn = new Subject<boolean>()
  public isLoggedIn$ = this.isLoggedIn.asObservable()
  private tokenTimer
  constructor(private http: HttpClient, private store: Store<State>) {}

  login(username: string, password: string) {
    return this.http.post('api/users/login', { username, password })
  }

  logout() {
    localStorage.removeItem('userData')
  }
  public isAuthenticated(): boolean {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const token = !!userData ? userData['token'] : null

    return token ? true : false
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn.next(value)
  }

  formatUser(user) {
    const expiresInDuration = 7200
    const now = new Date()
    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
    sessionStorage.setItem('expiration', expirationDate.toString())
    this.setAuthTimer(expiresInDuration)
    this.isLoggedIn.next(true)
  }

  setAuthTimer(duration) {
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000)
  }

  public getExpiration() {
    return new Date(sessionStorage.getItem('expiration'))
  }

  checkExpiration() {
    const authInformation = this.getExpiration()
    if (!authInformation) {
      return
    }
    const now = new Date()
    const expiresIn = authInformation.getTime() - now.getTime()

    if (expiresIn > 0) {
      this.setAuthTimer(expiresIn / 1000)
      this.store.dispatch({ type: ActionLoginTypes.userLoggedIn })
    } else {
      this.logout()
    }
  }
}
