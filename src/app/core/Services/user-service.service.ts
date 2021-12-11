import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Users } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url=environment.hostUrl;
  
  constructor(private http:HttpClient) { }
  

  getAllUsers(){
    return this.http.get(this.url+"/user/getAllUsers",{observe:"response"});
  }

  deleteUsers(id:any){
    return this.http.delete(this.url+"/user/deleteUser/"+id,{observe:"response"});
  }
}
