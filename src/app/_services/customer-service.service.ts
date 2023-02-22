import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Customer } from '../_models/customer'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public baseURL:string = "https://localhost:7231/Customer"
  constructor(private http:HttpClient) { }

 getAllCustomers(): Observable<any> {
    return this.http.get(`${this.baseURL}`)
 }
 postCustomer(customer: Customer): Observable<any> {
  return this.http.post(`${this.baseURL}`, customer)
 }
 
 deleteCustomer(customerNumber:number){
  return this.http.delete(`${this.baseURL}/${customerNumber}`)
 }

 updateCustomer(customer: Customer, customerNumber: number): Observable<any> {
  return this.http.put(`${this.baseURL}/${customerNumber}`, customer)
}
  
}
