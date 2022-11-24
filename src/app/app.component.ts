import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { take } from 'rxjs/operators'
import { State } from './reducers'

import { AuthService } from './services/auth.service'
import { Color } from './shared/models/color'
import { selectThemeColor } from './Store/burger-store/burger.selector'
import { selectIsLoggenIn } from './Store/login-store/login.selector'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn: Observable<boolean>

  color: Color = {}

  constructor(private authService: AuthService, private store: Store<State>) {}

  ngOnInit() {
    this.store
      .select(selectThemeColor)
      .pipe(take(1))
      .subscribe((color) => {
        this.onChangeTheme(color)
      })
  }

  onChangeTheme(color: Color) {
    switch (color.name) {
      case 'orange':
        document.documentElement.style.setProperty('--mainColor', '#ee7727')
        document.documentElement.style.setProperty('--secondColor', '#b45309')
        document.documentElement.style.setProperty('--carouselText', '#ca8a04')
        document.documentElement.style.setProperty('--coverPhoto', '#92400e')
        break
      case 'blue':
        document.documentElement.style.setProperty('--mainColor', '#0459a9')
        document.documentElement.style.setProperty('--secondColor', '#0284c7')
        document.documentElement.style.setProperty('--carouselText', '#60a5fa')
        document.documentElement.style.setProperty('--coverPhoto', '#1e40af')
        break
      case 'green':
        document.documentElement.style.setProperty('--mainColor', '#066619')
        document.documentElement.style.setProperty('--secondColor', '#059669')
        document.documentElement.style.setProperty('--carouselText', '#bbf7d0')
        document.documentElement.style.setProperty('--coverPhoto', '#dcfce7')
        break
      case 'rose':
        document.documentElement.style.setProperty('--mainColor', '#e11d48')
        document.documentElement.style.setProperty('--secondColor', '#be123c')
        document.documentElement.style.setProperty('--carouselText', '#fb7185')
        document.documentElement.style.setProperty('--coverPhoto', '#fda4af')
        break
    }
  }
}
