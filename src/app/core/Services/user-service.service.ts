import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../Model/User';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url=environment.hostUrl;


  tab:any=[]
  user:Users = new Users();
  public curUser= new BehaviorSubject(this.user);
  sharedUsers = this.curUser.asObservable();
  constructor(private http:HttpClient) { }


  getAllUsers(){
    return this.http.get(this.url+"/user/getAllUsers",{observe:"response"});
  }

  deleteUsers(id:any){
    return this.http.delete(this.url+"/user/deleteUser/"+id,{observe:"response"});
  }

  getUserByEmail(email: string) {
    return this.http.get(this.url+'/user/getUserByEmail/'+email).pipe(map(data => {
      this.tab=data;
      
      this.curUser.next(this.tab);
      
    }))
  }
  updateUser(data:Users,id:Number){
    return this.http.post(this.url+'/user/updateUser/'+id,data,{ observe: 'response' }).pipe(map((res) => {
      this.tab=res;
      this.curUser.next(this.tab);
    }));
  }
}
