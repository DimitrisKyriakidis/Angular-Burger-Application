import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable()
export class BurgerService {
  constructor(private http: HttpClient) {}

  public getAllBurgers(searchString?: string) {
    if (
      searchString !== '' &&
      searchString !== null &&
      searchString !== undefined
    ) {
      var getString = `searchString=${encodeURIComponent(searchString)}`
    }
    const apiUrl = `/api/burgers/getAllBurgers?${getString}`
    return this.http.get(apiUrl)
  }

  public saveBurger(body) {
    let finalReqBody

    const { bread, cheese, meat, comment, progress } = body.burger
    const sliced = body.burger.vegetables?.slice()

    finalReqBody = {
      ...finalReqBody,
      bread,
      cheese,
      meat,
      ...sliced,
      comment: comment ? comment : null,
      progress: progress ? progress : null,
    }

    const apiUrl = `api/burgers/createOrder`
    return this.http.post(apiUrl, finalReqBody)
  }

  public editBurger(id: string, updateData: any) {
    let finalReqBody

    const { bread, cheese, meat, comment, progress } = updateData
    const sliced = updateData.vegetables?.slice()

    finalReqBody = {
      ...finalReqBody,
      bread,
      cheese,
      meat,
      ...sliced,
      comment: comment ? comment : null,
      progress: progress ? progress : null,
    }

    const apiUrl = `api/burgers/editOrder/${id}`
    return this.http.put(apiUrl, finalReqBody)
  }

  public deleteBurger(id: string) {
    const apiUrl = `api/burgers/deleteOrder/${id}`
    return this.http.delete(apiUrl)
  }

  public sendOrderToHistory(shoppingCartData: [], totalPrice: number) {
    let body = {
      shoppingCartData: shoppingCartData,
      totalPrice: totalPrice,
    }
    const apiUrl = `api/burgers/sendOrderToHistory`
    return this.http.post(apiUrl, body)
  }

  public getAllHistoryOrders(searchString?: string) {
    if (
      searchString !== '' &&
      searchString !== null &&
      searchString !== undefined
    ) {
      var getString = `searchString=${encodeURIComponent(searchString)}`
    }
    const apiUrl = `api/burgers/getAllHistoryOrders?${getString}`
    return this.http.get(apiUrl)
  }

  public deleteHistoryOrders(historyOrderIds: string[]) {
    const apiUrl = `api/burgers/deleteHistoryOrders`
    return this.http.post(apiUrl, historyOrderIds)
  }
}
