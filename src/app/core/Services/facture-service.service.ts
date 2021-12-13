import { Injectable } from '@angular/core';

import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Facture } from '../Model/Facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  list: Facture[];
  p: number = 1;
  tab:any=[]
  term: string;
  facture:Facture = new Facture();
  public curUser= new BehaviorSubject(this.facture);
  url=environment.hostUrl;

  constructor(private http:HttpClient) { }

  getAllFacture(): Observable<Facture[]>{
    return this.http.get<Facture[]>("http://localhost:8080/api/facture/getallfacture");
  }

  getFactureById(id:number){
    return this.http.get(this.url+'/facture/getfactureid/'+id).pipe(map(data => {
      this.tab=data;

      this.curUser.next(this.tab);

    }))
  }


  UpdateFacture(id:any,Facture:Facture): Observable<Facture> {
    return this.http.put<Facture>("http://localhost:8080/api/facture/updatefacture/",+id);
  }
  deleteFacture(id:any){
    return this.http.delete(this.url+"/facture/deletfacture/"+id,{observe:"response"});
  }


  addFacture(Facture: Facture): Observable<Facture> {

    return this.http.post<Facture>(this.url+"/facture/addfacture/",Facture);
  }

}