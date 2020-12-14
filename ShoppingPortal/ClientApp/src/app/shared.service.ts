import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartDetails } from 'src/app/Models/CartDetails';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://localhost:59282";
  readonly PhotoURL = "http://localhost:59282/Photos/";
  
  constructor(private http:HttpClient) { }

  getProductList():Observable<any[]>
  {
    return this.http.get<any>(this.APIUrl + '/Product');
  }

  getAllProductList():Observable<any[]>
  {
    return this.http.get<any>(this.APIUrl + '/Product');
  }

  public ProductsOrdered: any
  public cartDetails: CartDetails[] = [];

  submitOrderDetails(val:any)
  {
    return this.http.post(this.APIUrl + '/OrderDetails', val);
  }
  submitProductsDetails(val:any)
  {
    return this.http.post(this.APIUrl + '/OrderDetails/SaveProductsOrdered', val);
  }

}
