import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../../Model/User';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url=environment.hostUrl;
  user:Users = new Users();
  public curUser= new BehaviorSubject(this.user);
  sharedUser = this.curUser.asObservable();
  tab:any=[];
  public email:string;
  public password:string;


  constructor(private http:HttpClient) { }


  login(email: string, password: string) {

    return this.http.get(this.url+'/user/login?email='+email+"&password="+password,
      { headers: { authorization: this.createBasicAuthToken(email, password) } }).pipe(map((res) => {
        this.email = email;
        this.password = password;
         this.tab=res;
         
         this.tab.roles.forEach((element:any) => {
           
          if(element.role!="ADMIN") throw new Error("Not a ADMIN");
          ;
        });
        
        localStorage.setItem("data",this.tab['idClient']);
        
        this.curUser.next(this.tab);
        this.registerSuccessfulLogin(email, password);  

      }));
  }
  createBasicAuthToken(email: string, password: string) {
    return 'Basic ' + window.btoa(email + ":" + password);
  }

  registerSuccessfulLogin(email:string, password:string) {
    // save the username to session
    sessionStorage.setItem("email",email);
    sessionStorage.setItem("password",password);
    localStorage.setItem("email",email)

  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem('email')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    
    localStorage.removeItem('email');
    sessionStorage.removeItem('email');
    sessionStorage.clear();
    localStorage.clear();
    this.curUser.lift;

    
  }

  getUserConnect(email: string) {
    console.log(email+" ")
    return this.http.get(this.url+'/user/getUserByEmail/'+email).pipe(map(data => {
      this.tab=data;
      this.curUser.next(this.tab);
    }))
  }
}
