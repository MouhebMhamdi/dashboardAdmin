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
  tab:any=[]
  fournisseur:Fournisseur = new Fournisseur();
  public curFournisseur= new BehaviorSubject(this.fournisseur);
  sharedUsers = this.curFournisseur.asObservable();
  constructor(private http:HttpClient) { }

  getAllFournisseur(): Observable<Fournisseur[]>{
    return this.http.get<Fournisseur[]>("http://localhost:8080/api/fournisseur/AllFournisseur");
  }

  DeleteFournisseur(id:any){
    return this.http.delete(this.url+"/fournisseur/deleteFournisseur/"+id,{observe:"response"});
  }

  findById(id: any) {
    return this.http.get(this.url+"/fournisseur/getByIdFournisseur/"+id,{observe:"response"});
  }
  UpdateFournisseur(data:Fournisseur,id:Number){
    return this.http.post(this.url+'/user/updateFournisseur/'+id,data,{ observe: 'response' }).pipe(map((res) => {
      this.tab=res;
      this.curFournisseur.next(this.tab);
    }));
  }
}
