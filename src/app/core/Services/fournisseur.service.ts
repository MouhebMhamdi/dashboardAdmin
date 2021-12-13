import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fournisseur } from '../Model/Fournisseur';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  url=environment.hostUrl;
  fournisseur:Fournisseur=new Fournisseur();
  tab:any=[];
  public curFournisseur= new BehaviorSubject(this.fournisseur);
  sharedFournisseurs = this.curFournisseur.asObservable();
  constructor(private http:HttpClient) { }

  getAllFournisseur(): Observable<Fournisseur[]>{
    return this.http.get<Fournisseur[]>("http://localhost:8080/api/fournisseur/AllFournisseur");
  }
  DeleteFournisseur(id:any){
    return this.http.delete(this.url+"/fournisseur/DeleteFournisseur/"+id,{observe:"response"});
  }
  findById(id:any){
    return this.http.get(this.url+id).pipe(map(data => {
      this.tab=data;
      
      this.curFournisseur.next(this.tab);
  }))
  }
  UpdateUser(data:Fournisseur,id:any){
    return this.http.post(this.url+'/fournisseur/updateFournisseur/'+id,data,{ observe: 'response' }).pipe(map((res) => {
      this.tab=res;
      this.curFournisseur.next(this.tab);
    }));
  }
  AddRayon(data:Fournisseur){
    return this.http.post(this.url+'/fournisseur/AllFournisseur',data,{ observe: 'response' })
  }
}
