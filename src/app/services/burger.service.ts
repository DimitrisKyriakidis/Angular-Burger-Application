import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Burgers } from '../models/burger'

@Injectable()
export class BurgerService {
  burgerId: string = null

  constructor(private http: HttpClient) {}

  public getBurgerId() {
    return this.burgerId
  }
  public findAllBurgers() {
    const apiUrl = '/api/burgers'
    return this.http.get(apiUrl)
  }

  public saveBurger(iconUrl: string, description: string, category: string) {
    let body = { iconUrl, description, category }
    const apiUrl = `api/burger`
    return this.http.post(apiUrl, body)
  }

  public editBurger(
    id: string,
    iconUrl: string,
    description: string,
    category: string,
  ) {
    let body = {
      iconUrl: iconUrl,
      description: description,
      category: category,
    }
    const apiUrl = 'api/editBurger/' + id
    return this.http.put(apiUrl, body)
  }

  public deleteBurger(id: string) {
    const apiUrl = `api/course/${id}`
    return this.http.delete(apiUrl)
  }
}
