import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {ReactiveFormsModule} from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap} from '@ngrx/data';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from '../../Store/login-store/login.reducers';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from '../../Store/login-store/login.effects';



export const routes = [
 
  {
    path: '',
    component: LoginComponent

  },

];


@NgModule({
  imports: [
      LoginComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
   StoreModule.forFeature('login',loginReducer),
   EffectsModule.forRoot([LoginEffects]),
    ReactiveFormsModule,
   
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent
  
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [],
  providers: [AuthService
   
  ]
})
export class LoginModule {

    
  

}
