import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/core/Model/User';
import { UserService } from 'src/app/core/Services/auth/user.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  sideBarOpen= true;
  users: Users;
  hide:boolean;
  data:any;
  constructor(public router: Router,private authService:UserService) { }

  
  ngOnInit(): void {
    this.verifUserRoleConncet(String(localStorage.getItem("email")))
    this.authService.sharedUser.subscribe(
      (data:Users)=>
      {this.users=data},
      ()=>{},
      ()=>{this.users = new Users()}
    )
      
      this.data=localStorage.getItem("data");

      if(this.users.email==null) {
        console.log("vide")
      }
  }

  verifUserRoleConncet(email:string){
    this.authService.getUserConnect(String(email)).subscribe(user =>{})
}
  sideBarToggler(){
    this.sideBarOpen=!this.sideBarOpen;
  }
}
