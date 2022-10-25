import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// import { OnDemandPreloadStrategyService } from './on-demand-preload/on-demand-preload-strategy.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'burgers',
    loadChildren: () =>
      import('../burgers/burgers.module').then((m) => m.BurgersModule),
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      // preloadingStrategy: OnDemandPreloadStrategyService,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
