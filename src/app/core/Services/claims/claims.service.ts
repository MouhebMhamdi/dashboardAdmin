import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Claims} from "../../Model/claims";

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  url = "http://localhost:8080/api/reclamation/"

  constructor(private http: HttpClient) {
  }

  getAllClaims(): Observable<Claims[]> {
    return this.http.get<Claims[]>(this.url + 'getAllReclamations');
  }

  getClaim(id: number): Observable<Claims> {
    return this.http.get<Claims>(this.url + 'getReclamation/' + id);
  }

  deleteClaim(id:number){
    return this.http.delete(this.url+"deleteReclamation/"+id)
  }
}
