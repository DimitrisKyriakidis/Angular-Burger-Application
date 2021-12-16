import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./model/user.model";
import { State } from "../reducers";
import { Store } from "@ngrx/store";
import { AuthResponseData } from "./model/AuthResponseData";
import { logout } from "../Store/login-store/login.actions";




@Injectable()
export class AuthService {
    timeoutInterval: any;
    constructor(private http:HttpClient,private store: Store<State>) {

    }

    login(email:string, password:string):Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>('/api/login', {email,password});
    }
    logout() {
      localStorage.removeItem('userData');
      if (this.timeoutInterval) {
        clearTimeout(this.timeoutInterval);
        this.timeoutInterval = null;
      }
    }
    
    formatUser(data: AuthResponseData) {
        const expirationDate = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        const user = new User(
          data.email,
          data.id,
          data.idToken,
          data.localId,
          expirationDate
        );
        return user;
      }
    
      getErrorMessage(message: string) {
        switch (message) {
          case 'EMAIL_NOT_FOUND':
            return 'Email Not Found';
          case 'INVALID_PASSWORD':
            return 'Invalid Password';
          case 'EMAIL_EXISTS':
            return 'Email already exists';
          default:
            return 'Unknown error occurred. Please try again';
        }
      }
    
      setUserInLocalStorage(user: User) {
        localStorage.setItem('userData', JSON.stringify(user));
    
        this.runTimeoutInterval(user);
      }
    
      runTimeoutInterval(user: User) {
        const todaysDate = new Date().getTime();
        const expirationDate = user.expireDate.getTime();
        const timeInterval = expirationDate - todaysDate;
    
        this.timeoutInterval = setTimeout(() => {
        //   this.store.dispatch(autoLogout());
          //logout functionality or get the refresh token
        }, timeInterval);
      }
    
      getUserFromLocalStorage() {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const expirationDate = new Date(userData.expirationDate);
          const user = new User(
            userData.email,
            userData.token,
             userData.id,
             userData.localId,
            expirationDate
          );
          this.runTimeoutInterval(user);
          return user;
        }
        return null;
      }
    
   
      
      }

