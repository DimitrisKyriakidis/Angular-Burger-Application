import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { element } from 'protractor'

@Injectable()
export class BurgerService {
  burgerId: string = null

  constructor(private http: HttpClient) {}

  public getBurgerId() {
    return this.burgerId
  }
  public getAllBurgers() {
    const apiUrl = '/api/burgers/getAllBurgers'
    return this.http.get(apiUrl)
  }

  public saveBurger(body) {
    // let reqBody = body.burger
    console.log('bodyService=', body)

    let finalReqBody

    const { bread, cheese, meat, comment, status } = body.burger
    const sliced = body.burger.vegetables?.slice()

    finalReqBody = {
      ...finalReqBody,
      bread,
      cheese,
      meat,
      ...sliced,
      comment: comment ? comment : null,
      status: status ? status : null,
    }

    console.log('finalReqBody==', finalReqBody)

    const apiUrl = `api/burgers/createOrder`
    return this.http.post(apiUrl, finalReqBody)
  }

  public editBurger(id: string, updateData: any) {
    console.log('ID==', id)

    console.log('updateData=', updateData)

    let finalReqBody
    // let temp = Object.keys(body.burger).map((key) => body.burger[key])
    // console.log('temp==', temp)

    const { bread, cheese, meat, comment, status } = updateData
    const sliced = updateData.vegetables?.slice()

    // finalReqBody.push(bread, cheese, meat, { comment: comment })
    finalReqBody = {
      ...finalReqBody,
      bread,
      cheese,
      meat,
      ...sliced,
      comment: comment ? comment : null,
      status: status ? status : null,
    }

    const apiUrl = `api/burgers/editOrder/${id}`
    return this.http.put(apiUrl, finalReqBody)
  }

  public deleteBurger(id: string) {
    const apiUrl = `api/burgers/deleteOrder/${id}`
    return this.http.delete(apiUrl)
  }
}
