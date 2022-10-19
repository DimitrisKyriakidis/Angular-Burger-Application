import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { element } from "protractor";

@Injectable()
export class BurgerService {
  burgerId: string = null;

  constructor(private http: HttpClient) {}

  public getBurgerId() {
    return this.burgerId;
  }
  public getAllBurgers() {
    const apiUrl = "/api/burgers/getAllBurgers";
    return this.http.get(apiUrl);
  }

  public saveBurger(body) {
    // let reqBody = body.burger
    const { bread, cheese, meat } = body.burger;
    const finalReqBody = body.burger.vegetables.slice();
    finalReqBody.push(bread, cheese, meat);
    console.log("finalReqBody==", finalReqBody);

    const apiUrl = `api/burgers/createOrder`;
    return this.http.post(apiUrl, finalReqBody);
  }

  public editBurger(
    id: string,
    iconUrl: string,
    description: string,
    category: string
  ) {
    let body = {
      iconUrl: iconUrl,
      description: description,
      category: category,
    };
    const apiUrl = "api/editBurger/" + id;
    return this.http.put(apiUrl, body);
  }

  public deleteBurger(id: string) {
    const apiUrl = `api/course/${id}`;
    return this.http.delete(apiUrl);
  }
}
