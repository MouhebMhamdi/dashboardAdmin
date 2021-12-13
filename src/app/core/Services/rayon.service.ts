import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Rayon } from '../Model/Rayon';

@Injectable({
  providedIn: 'root'
})
export class RayonService {
  url=environment.hostUrl;
  rayon:Rayon=new Rayon();
  tab:any=[];
  public curRayon= new BehaviorSubject(this.rayon);
  sharedRayons = this.curRayon.asObservable();
  constructor(private http:HttpClient) { }

  getAllRayon(): Observable<Rayon[]>{
    return this.http.get<Rayon[]>("http://localhost:8080/api/Rayon/AllRayon");
  }
  DeleteRayonByID(id:any){
    return this.http.delete(this.url+"/Rayon/DeleteRayon/"+id,{observe:"response"});
  }
  FindRayonByID(id:any){
    return this.http.get(this.url+'/Rayon/'+id).pipe(map(data => {
      this.tab=data;
      
      this.curRayon.next(this.tab);
  }))
  }
  updaterayon(data:Rayon,id:any){
    return this.http.post(this.url+'/Rayon/updateRayon/'+id,data,{ observe: 'response' }).pipe(map((res) => {
      this.tab=res;
      this.curRayon.next(this.tab);
    }));
  }
}
