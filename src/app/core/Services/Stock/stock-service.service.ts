import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Stock} from "../../Model/Stock";
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StockServiceService {
  url=environment.hostUrl;
  stock:Stock=new Stock();
  public curStock= new BehaviorSubject(this.stock);
  sharedStock = this.curStock.asObservable();

  public curStock2= new BehaviorSubject(this.stock);
  sharedStock2 = this.curStock2.asObservable();

  tab:any=[]
  constructor(private http: HttpClient) { }

  getAllStock(){
    return this.http.get<Stock[]>(this.url+"/stock/getAllStocks").pipe(map(data => {
    this.tab=data;
    this.curStock.next(this.tab);
    }))
  }

  ajoutStock(data:any){
    return this.http.post(this.url+"/stock/addStock",data,{responseType:"text"}); 
  }

  deleteStock(id:any){
    console.log(id)
    return this.http.delete(this.url+"/stock/delete/"+id,{responseType:"text"});
  }

  updateStock(data:Stock,id:any){
    return this.http.post(this.url+"/stock/updatestock/"+id,data,{responseType:"text"});
  }

  getStockById(id:any){
    return this.http.get<Stock[]>(this.url+"/stock/getStockById/"+id).pipe(map(data => {
      this.tab=data;
      this.curStock2.next(this.tab);
      }))
  }

}
