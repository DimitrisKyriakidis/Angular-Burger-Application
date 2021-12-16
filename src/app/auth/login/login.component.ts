import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {EmailValidator, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop, Observable} from "rxjs";
import {Router} from "@angular/router";
import { State } from '../../reducers';
import { ActionLoginTypes, login } from '../../Store/login-store/login.actions';
import { selectUser } from '../../Store/login-store/login.selector';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
loggedIn:Observable<any>
  constructor(
     
      private auth: AuthService,
      private router:Router,
      private store:Store<State>) {

     

  }

  ngOnInit() {
    this.form =new FormGroup({
      email: new FormControl ('user', [Validators.required]),
      password:new FormControl ('123', [Validators.required])
  });
  this.loggedIn=this.store.select(selectUser)
  console.log(this.loggedIn);
  
  }

  login() { 
    if(this.form.valid){
      const email=this.form.value.email
    const password=this.form.value.password

    
    this.store.dispatch(login({email,password}))

    }
   
  }

}

